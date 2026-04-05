const API_BASE = process.env.NEXT_PUBLIC_LINX_API_URL || 'https://linx-server-production.up.railway.app/api';

// ── Auth token helpers ──

function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('linx_token');
}

function getAccountId(): string {
    if (typeof window === 'undefined') return 'default';
    return localStorage.getItem('linx_account_id') || process.env.NEXT_PUBLIC_LINX_ACCOUNT_ID || 'default';
}

export function setAuth(token: string, accountId: string) {
    localStorage.setItem('linx_token', token);
    localStorage.setItem('linx_account_id', accountId);
}

export function clearAuth() {
    localStorage.removeItem('linx_token');
    localStorage.removeItem('linx_account_id');
}

export function isLoggedIn(): boolean {
    return !!getToken();
}

// ── Core fetch helper ──

async function api<T>(path: string, options?: RequestInit): Promise<T> {
    const token = getToken();
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options?.headers,
        },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || `API Error ${res.status}`);
    }
    return res.json();
}

// ── Auth ──

export interface AuthResult {
    token: string;
    accountId: string;
    email: string;
}

export interface Me {
    accountId: string;
    email: string;
    plan: string;
    setupComplete: boolean;
    lineConnected: boolean;
}

export async function register(email: string, password: string): Promise<AuthResult> {
    const result = await api<AuthResult>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    setAuth(result.token, result.accountId);
    return result;
}

export async function login(email: string, password: string): Promise<AuthResult> {
    const result = await api<AuthResult>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    setAuth(result.token, result.accountId);
    return result;
}

export async function getMe(): Promise<Me> {
    return api<Me>('/auth/me');
}

// ── Knowledge ──

export interface KnowledgeItem {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export async function getKnowledge(): Promise<KnowledgeItem[]> {
    const data = await api<{ items: KnowledgeItem[] }>(`/linx/knowledge/${getAccountId()}`);
    return data.items;
}

export async function addKnowledge(title: string, content: string): Promise<KnowledgeItem> {
    return api(`/linx/knowledge/${getAccountId()}`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
    });
}

export async function updateKnowledge(id: string, title: string, content: string): Promise<KnowledgeItem> {
    return api(`/linx/knowledge/${getAccountId()}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
    });
}

export async function deleteKnowledge(id: string): Promise<void> {
    await api(`/linx/knowledge/${getAccountId()}/${id}`, { method: 'DELETE' });
}

export async function uploadPDF(file: File, title?: string): Promise<KnowledgeItem & { source: string; pages: number; extractedChars: number }> {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);

    const res = await fetch(`${API_BASE}/linx/knowledge/${getAccountId()}/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || `Upload Error ${res.status}`);
    }
    return res.json();
}

// ── Settings ──

export interface Settings {
    botName: string;
    tone: 'professional' | 'casual' | 'formal';
    escalationUserId: string;
    plan: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    lineChannelId?: string;
    lineChannelAccessToken?: string;
    setupComplete?: boolean;
    clientStripeConnected?: boolean;
    planLimits: {
        maxMonthlyResponses: number;
        maxKnowledgeFiles: number;
    };
}

export async function getSettings(): Promise<Settings> {
    return api(`/linx/settings/${getAccountId()}`);
}

export async function updateSettings(updates: Partial<Pick<Settings, 'botName' | 'tone' | 'escalationUserId'>> & { clientStripeSecretKey?: string }): Promise<Settings> {
    return api(`/linx/settings/${getAccountId()}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
}

export async function updateLineSettings(lineChannelId: string, lineChannelSecret: string, lineChannelAccessToken: string): Promise<{ success: boolean; webhookUrl: string; botId: string }> {
    return api(`/linx/settings/${getAccountId()}/line`, {
        method: 'PUT',
        body: JSON.stringify({ lineChannelId, lineChannelSecret, lineChannelAccessToken }),
    });
}

export async function getWebhookUrl(): Promise<{ webhookUrl: string }> {
    return api(`/linx/webhook-url/${getAccountId()}`);
}

// ── Billing ──

export async function createCheckoutSession(plan: string): Promise<{ sessionId: string; url: string }> {
    return api('/linx/billing/checkout', {
        method: 'POST',
        body: JSON.stringify({ accountId: getAccountId(), plan }),
    });
}

export async function createPortalSession(customerId: string): Promise<{ url: string }> {
    return api('/linx/billing/portal', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    });
}

// ── Membership ──

export interface MembershipPlan {
    id: string;
    name: string;
    monthlyPrice: number;
}

export interface EnrollmentFee {
    id: string;
    name: string;
    price: number;
}

export async function getMembershipPlans(): Promise<{ plans: MembershipPlan[]; enrollmentFees: EnrollmentFee[] }> {
    const res = await api<{ success: boolean; data: { plans: MembershipPlan[]; enrollmentFees: EnrollmentFee[] } }>('/linx/billing/membership-plans');
    return res.data;
}

export async function createMembershipCheckout(params: {
    customerId?: string;
    customerName?: string;
    customerEmail?: string;
    plan: string;
    enrollmentType: string;
}): Promise<{ sessionId: string; url: string }> {
    const res = await api<{ success: boolean; data: { sessionId: string; url: string } }>('/linx/billing/membership-checkout', {
        method: 'POST',
        body: JSON.stringify(params),
    });
    return res.data;
}

// ── Logs ──

export interface LogEntry {
    timestamp: string;
    displayName: string;
    query: string;
    response: string;
    escalated: boolean;
    groupId?: string;
    toolsUsed?: string[];
}

export async function getLogs(limit = 50, offset = 0): Promise<LogEntry[]> {
    const data = await api<{ items: LogEntry[]; total: number }>(`/linx/logs/${getAccountId()}?limit=${limit}&offset=${offset}`);
    return data.items;
}

// ── Auto Setup ──

export interface AutoSetupResult {
    success: boolean;
    items: KnowledgeItem[];
    itemsCreated: number;
    suggestion: {
        botName: string;
        tone: string;
    };
}

export async function autoSetupFromUrl(url: string): Promise<AutoSetupResult> {
    return api(`/linx/auto-setup/${getAccountId()}`, {
        method: 'POST',
        body: JSON.stringify({ url }),
    });
}

// ── Reservations ──

export interface Reservation {
    id: string;
    customerName: string;
    customerLineUserId?: string;
    date: string;
    startTime: string;
    endTime: string;
    service?: string;
    staffId?: string;
    staffName?: string;
    note?: string;
    status: 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
    updatedAt: string;
}

export interface AvailableSlot {
    startTime: string;
    endTime: string;
}

export interface BusinessHour {
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
    slotDuration?: number;
}

export async function getReservations(from: string, to: string): Promise<Reservation[]> {
    const data = await api<{ success: boolean; data: Reservation[] }>(`/linx/reservations/${getAccountId()}?from=${from}&to=${to}`);
    return data.data || [];
}

export async function createReservation(reservation: { customerName: string; date: string; startTime: string; endTime: string; service?: string; note?: string }): Promise<Reservation> {
    const data = await api<{ success: boolean; data: Reservation }>(`/linx/reservations/${getAccountId()}`, {
        method: 'POST',
        body: JSON.stringify(reservation),
    });
    return data.data;
}

export async function updateReservation(id: string, updates: { status?: string }): Promise<void> {
    await api(`/linx/reservations/${getAccountId()}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
}

export async function cancelReservation(id: string): Promise<void> {
    await api(`/linx/reservations/${getAccountId()}/${id}`, { method: 'DELETE' });
}

export async function getAvailableSlots(date: string): Promise<AvailableSlot[]> {
    const data = await api<{ success: boolean; data: AvailableSlot[] }>(`/linx/reservations/${getAccountId()}/available?date=${date}`);
    return data.data || [];
}

export async function getBusinessHours(): Promise<BusinessHour[]> {
    const data = await api<{ success: boolean; data: BusinessHour[] }>(`/linx/business-hours/${getAccountId()}`);
    return data.data || [];
}

export async function setBusinessHours(hours: BusinessHour[]): Promise<void> {
    await api(`/linx/business-hours/${getAccountId()}`, {
        method: 'PUT',
        body: JSON.stringify({ hours }),
    });
}

// ── Customers ──

export interface Customer {
    id: string;
    name: string;
    lineUserId?: string;
    email?: string;
    phone?: string;
    plan?: string;
    notes?: string;
    firstVisit?: string;
    lastVisit?: string;
    visitCount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export async function getCustomers(): Promise<Customer[]> {
    const data = await api<{ success: boolean; data: Customer[] }>(`/linx/customers/${getAccountId()}`);
    return data.data || [];
}

export async function createCustomer(customer: { name: string; email?: string; phone?: string; plan?: string; notes?: string }): Promise<Customer> {
    const data = await api<{ success: boolean; data: Customer }>(`/linx/customers/${getAccountId()}`, {
        method: 'POST',
        body: JSON.stringify(customer),
    });
    return data.data;
}

export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    const data = await api<{ success: boolean; data: Customer }>(`/linx/customers/${getAccountId()}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
    return data.data;
}

// ── CSV Import ──

export async function importCustomersCSV(file: File): Promise<{ success: boolean; imported: number; total: number; errors: string[] }> {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/linx/import/customers/${getAccountId()}`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });
    if (!res.ok) { const err = await res.json().catch(() => ({ error: res.statusText })); throw new Error(err.error); }
    return res.json();
}

export async function importReservationsCSV(file: File): Promise<{ success: boolean; imported: number; total: number; errors: string[] }> {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/linx/import/reservations/${getAccountId()}`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });
    if (!res.ok) { const err = await res.json().catch(() => ({ error: res.statusText })); throw new Error(err.error); }
    return res.json();
}

// ── Services ──

export interface Service {
    id: string;
    accountId: string;
    name: string;
    duration: number;
    price: number;
    maxParticipants: number;
    description?: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
}

export async function getServices(): Promise<Service[]> {
    const data = await api<{ success: boolean; data: Service[] }>(`/linx/services/${getAccountId()}`);
    return data.data || [];
}

export async function createService(service: { name: string; duration: number; price: number; maxParticipants?: number; description?: string }): Promise<Service> {
    const data = await api<{ success: boolean; data: Service }>(`/linx/services/${getAccountId()}`, {
        method: 'POST',
        body: JSON.stringify(service),
    });
    return data.data;
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service> {
    const data = await api<{ success: boolean; data: Service }>(`/linx/services/${getAccountId()}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
    return data.data;
}

export async function deleteService(id: string): Promise<void> {
    await api(`/linx/services/${getAccountId()}/${id}`, { method: 'DELETE' });
}

// ── Staff ──

export interface Staff {
    id: string;
    accountId: string;
    name: string;
    role?: string;
    email?: string;
    lineUserId?: string;
    isActive: boolean;
    createdAt: string;
}

export async function getStaff(): Promise<Staff[]> {
    const data = await api<{ success: boolean; data: Staff[] }>(`/linx/staff/${getAccountId()}`);
    return data.data || [];
}

export async function createStaff(staff: { name: string; role?: string; email?: string; lineUserId?: string }): Promise<Staff> {
    const data = await api<{ success: boolean; data: Staff }>(`/linx/staff/${getAccountId()}`, {
        method: 'POST',
        body: JSON.stringify(staff),
    });
    return data.data;
}

export async function updateStaff(id: string, updates: Partial<Staff>): Promise<Staff> {
    const data = await api<{ success: boolean; data: Staff }>(`/linx/staff/${getAccountId()}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
    return data.data;
}

export async function deleteStaff(id: string): Promise<void> {
    await api(`/linx/staff/${getAccountId()}/${id}`, { method: 'DELETE' });
}

// ── Staff Availability ──

export interface StaffAvailability {
    id?: string;
    staffId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
}

export interface StaffDayOff {
    id: string;
    staffId: string;
    date: string;
    reason?: string;
    createdAt?: string;
}

export async function getStaffAvailability(staffId: string): Promise<StaffAvailability[]> {
    const data = await api<{ success: boolean; data: StaffAvailability[] }>(`/linx/staff/${getAccountId()}/${staffId}/availability`);
    return data.data || [];
}

export async function setStaffAvailability(staffId: string, slots: Omit<StaffAvailability, 'id' | 'staffId'>[]): Promise<void> {
    await api(`/linx/staff/${getAccountId()}/${staffId}/availability`, {
        method: 'PUT',
        body: JSON.stringify(slots),
    });
}

export async function getStaffDayOffs(staffId: string): Promise<StaffDayOff[]> {
    const data = await api<{ success: boolean; data: StaffDayOff[] }>(`/linx/staff/${getAccountId()}/${staffId}/day-off`);
    return data.data || [];
}

export async function addStaffDayOff(staffId: string, date: string, reason?: string): Promise<StaffDayOff> {
    const data = await api<{ success: boolean; data: StaffDayOff }>(`/linx/staff/${getAccountId()}/${staffId}/day-off`, {
        method: 'POST',
        body: JSON.stringify({ date, reason }),
    });
    return data.data;
}

export async function deleteStaffDayOff(staffId: string, dayOffId: string): Promise<void> {
    await api(`/linx/staff/${getAccountId()}/${staffId}/day-off/${dayOffId}`, { method: 'DELETE' });
}

// ── Resources ──

export interface Resource {
    id: string;
    accountId: string;
    name: string;
    type?: string;
    capacity: number;
    isActive: boolean;
    createdAt: string;
}

export async function getResources(): Promise<Resource[]> {
    const data = await api<{ success: boolean; data: Resource[] }>(`/linx/resources/${getAccountId()}`);
    return data.data || [];
}

export async function createResource(resource: { name: string; type?: string; capacity?: number }): Promise<Resource> {
    const data = await api<{ success: boolean; data: Resource }>(`/linx/resources/${getAccountId()}`, {
        method: 'POST',
        body: JSON.stringify(resource),
    });
    return data.data;
}

export async function updateResource(id: string, updates: Partial<Resource>): Promise<Resource> {
    const data = await api<{ success: boolean; data: Resource }>(`/linx/resources/${getAccountId()}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
    return data.data;
}

export async function deleteResource(id: string): Promise<void> {
    await api(`/linx/resources/${getAccountId()}/${id}`, { method: 'DELETE' });
}

// ── Schedule Templates ──

export interface ScheduleTemplate {
    id: string;
    accountId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    serviceId?: string;
    staffId?: string;
    resourceId?: string;
    maxParticipants: number;
    isActive: boolean;
    createdAt: string;
    // Joined fields
    serviceName?: string;
    serviceDuration?: number;
    servicePrice?: number;
    staffName?: string;
    resourceName?: string;
}

export async function getScheduleTemplates(dayOfWeek?: number): Promise<ScheduleTemplate[]> {
    const params = dayOfWeek !== undefined ? `?dayOfWeek=${dayOfWeek}` : '';
    const data = await api<{ success: boolean; data: ScheduleTemplate[] }>(`/linx/schedule/${getAccountId()}${params}`);
    return data.data || [];
}

export async function createScheduleTemplate(template: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    serviceId?: string;
    staffId?: string;
    resourceId?: string;
    maxParticipants?: number;
}): Promise<ScheduleTemplate> {
    const data = await api<{ success: boolean; data: ScheduleTemplate }>(`/linx/schedule/${getAccountId()}`, {
        method: 'POST',
        body: JSON.stringify(template),
    });
    return data.data;
}

export async function updateScheduleTemplate(id: string, updates: Partial<ScheduleTemplate>): Promise<ScheduleTemplate> {
    const data = await api<{ success: boolean; data: ScheduleTemplate }>(`/linx/schedule/${getAccountId()}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
    return data.data;
}

export async function deleteScheduleTemplate(id: string): Promise<void> {
    await api(`/linx/schedule/${getAccountId()}/${id}`, { method: 'DELETE' });
}

export interface SmartSlot {
    templateId: string;
    startTime: string;
    endTime: string;
    serviceName: string;
    serviceDuration?: number;
    servicePrice?: number;
    staffName?: string;
    staffId?: string;
    resourceName?: string;
    resourceId?: string;
    maxParticipants: number;
    remainingSpots: number;
    isAvailable: boolean;
}

export async function getSmartAvailability(date: string): Promise<SmartSlot[]> {
    const data = await api<{ success: boolean; data: SmartSlot[] }>(`/linx/schedule/${getAccountId()}/availability?date=${date}`);
    return data.data || [];
}

export async function copyDaySchedule(fromDay: number, toDay: number): Promise<ScheduleTemplate[]> {
    const data = await api<{ success: boolean; data: ScheduleTemplate[] }>(`/linx/schedule/${getAccountId()}/copy`, {
        method: 'POST',
        body: JSON.stringify({ fromDay, toDay }),
    });
    return data.data || [];
}

// ── Stats ──

export interface Stats {
    monthlyResponses: number;
    maxMonthlyResponses: number;
    knowledgeFiles: number;
    maxKnowledgeFiles: number;
    plan: string;
}

export async function getStats(): Promise<Stats> {
    return api(`/linx/stats/${getAccountId()}`);
}
