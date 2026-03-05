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
    planLimits: {
        maxMonthlyResponses: number;
        maxKnowledgeFiles: number;
    };
}

export async function getSettings(): Promise<Settings> {
    return api(`/linx/settings/${getAccountId()}`);
}

export async function updateSettings(updates: Partial<Pick<Settings, 'botName' | 'tone' | 'escalationUserId'>>): Promise<Settings> {
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
