const API_BASE = process.env.NEXT_PUBLIC_LINX_API_URL || 'https://linx-server-production.up.railway.app/api';
const ACCOUNT_ID = process.env.NEXT_PUBLIC_LINX_ACCOUNT_ID || 'default';

async function api<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || `API Error ${res.status}`);
    }
    return res.json();
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
    const data = await api<{ items: KnowledgeItem[] }>(`/linx/knowledge/${ACCOUNT_ID}`);
    return data.items;
}

export async function addKnowledge(title: string, content: string): Promise<KnowledgeItem> {
    return api(`/linx/knowledge/${ACCOUNT_ID}`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
    });
}

export async function updateKnowledge(id: string, title: string, content: string): Promise<KnowledgeItem> {
    return api(`/linx/knowledge/${ACCOUNT_ID}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
    });
}

export async function deleteKnowledge(id: string): Promise<void> {
    await api(`/linx/knowledge/${ACCOUNT_ID}/${id}`, { method: 'DELETE' });
}

// ── Settings ──

export interface Settings {
    botName: string;
    tone: 'professional' | 'casual' | 'formal';
    escalationUserId: string;
    plan: string;
    planLimits: {
        maxMonthlyResponses: number;
        maxKnowledgeFiles: number;
    };
}

export async function getSettings(): Promise<Settings> {
    return api(`/linx/settings/${ACCOUNT_ID}`);
}

export async function updateSettings(updates: Partial<Pick<Settings, 'botName' | 'tone' | 'escalationUserId'>>): Promise<Settings> {
    return api(`/linx/settings/${ACCOUNT_ID}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
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
    return api(`/linx/logs/${ACCOUNT_ID}?limit=${limit}&offset=${offset}`);
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
    return api(`/linx/stats/${ACCOUNT_ID}`);
}
