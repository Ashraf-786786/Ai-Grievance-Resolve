// ============================================================
//  Mock data for Human-AI Grievance Management System
// ============================================================

export const categories = [
    'Infrastructure', 'Water Supply', 'Electricity', 'Sanitation',
    'Healthcare', 'Education', 'Public Safety', 'Taxation', 'Land Records', 'Transportation'
];

export const departments = [
    'PWD', 'NWSC', 'DISCOM', 'Sanitation Dept', 'Health Dept',
    'Education Dept', 'Police', 'Revenue Dept', 'Land Authority', 'Transport'
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const complaintsRaw = [
    { id: 'GRV-001', title: 'Road pothole causing accidents near NH-48', category: 'Infrastructure', priority: 'Critical', status: 'Human Review', department: 'PWD', confidence: 0.42, verified: false },
    { id: 'GRV-002', title: 'No water supply for 5 days in Sector 12B', category: 'Water Supply', priority: 'High', status: 'Human Review', department: 'NWSC', confidence: 0.78, verified: true },
    { id: 'GRV-003', title: 'Power outage every evening for last 3 weeks', category: 'Electricity', priority: 'High', status: 'Auto', department: 'DISCOM', confidence: 0.91, verified: true },
    { id: 'GRV-004', title: 'Open sewage drain near school in Ward 7', category: 'Sanitation', priority: 'Critical', status: 'Human Review', department: 'Sanitation Dept', confidence: 0.55, verified: false },
    { id: 'GRV-005', title: 'PHC doctor absent for 2 months', category: 'Healthcare', priority: 'High', status: 'Resolved', department: 'Health Dept', confidence: 0.88, verified: true },
    { id: 'GRV-006', title: 'Mid-day meal not provided in government school', category: 'Education', priority: 'Medium', status: 'Auto', department: 'Education Dept', confidence: 0.94, verified: true },
    { id: 'GRV-007', title: 'CCTV cameras not working near market area', category: 'Public Safety', priority: 'Medium', status: 'Auto', department: 'Police', confidence: 0.82, verified: true },
    { id: 'GRV-008', title: 'Double taxation notice received for same property', category: 'Taxation', priority: 'High', status: 'Human Review', department: 'Revenue Dept', confidence: 0.61, verified: false },
    { id: 'GRV-009', title: 'Land mutation records not updated since 2020', category: 'Land Records', priority: 'Medium', status: 'Auto', department: 'Land Authority', confidence: 0.87, verified: true },
    { id: 'GRV-010', title: 'Bus route 42 cancelled without notice', category: 'Transportation', priority: 'Low', status: 'Resolved', department: 'Transport', confidence: 0.95, verified: true },
    { id: 'GRV-011', title: 'Flyover construction blocking street lights', category: 'Infrastructure', priority: 'Medium', status: 'Auto', department: 'PWD', confidence: 0.76, verified: true },
    { id: 'GRV-012', title: 'Contaminated water supply causing illness', category: 'Water Supply', priority: 'Critical', status: 'Human Review', department: 'NWSC', confidence: 0.38, verified: false },
    { id: 'GRV-013', title: 'Electricity meter tampered by contractor', category: 'Electricity', priority: 'High', status: 'Human Review', department: 'DISCOM', confidence: 0.52, verified: false },
    { id: 'GRV-014', title: 'Garbage not collected for 10 days in Block C', category: 'Sanitation', priority: 'Medium', status: 'Auto', department: 'Sanitation Dept', confidence: 0.93, verified: true },
    { id: 'GRV-015', title: 'Ambulance service unreachable on emergency number', category: 'Healthcare', priority: 'Critical', status: 'Human Review', department: 'Health Dept', confidence: 0.44, verified: false },
    { id: 'GRV-016', title: 'School teacher posting false attendance records', category: 'Education', priority: 'High', status: 'Human Review', department: 'Education Dept', confidence: 0.59, verified: false },
    { id: 'GRV-017', title: 'Illegal liquor shop operating near school zone', category: 'Public Safety', priority: 'High', status: 'Human Review', department: 'Police', confidence: 0.67, verified: true },
    { id: 'GRV-018', title: 'GST refund pending since 8 months', category: 'Taxation', priority: 'Medium', status: 'Auto', department: 'Revenue Dept', confidence: 0.89, verified: true },
    { id: 'GRV-019', title: 'Encroachment on government land in Khasra 342', category: 'Land Records', priority: 'High', status: 'Human Review', department: 'Land Authority', confidence: 0.63, verified: false },
    { id: 'GRV-020', title: 'Metro station escalator broken for 2 months', category: 'Transportation', priority: 'Medium', status: 'Auto', department: 'Transport', confidence: 0.91, verified: true },
    { id: 'GRV-021', title: 'Bridge handrail missing on river overpass', category: 'Infrastructure', priority: 'Critical', status: 'Auto', department: 'PWD', confidence: 0.84, verified: true },
    { id: 'GRV-022', title: 'Water connection denied despite paying fees', category: 'Water Supply', priority: 'Medium', status: 'Resolved', department: 'NWSC', confidence: 0.97, verified: true },
    { id: 'GRV-023', title: 'High voltage wire hanging low near playground', category: 'Electricity', priority: 'Critical', status: 'Human Review', department: 'DISCOM', confidence: 0.47, verified: false },
];

const timestamps = [
    '2026-04-02T04:12:00Z', '2026-04-02T05:30:00Z', '2026-04-01T18:00:00Z',
    '2026-04-01T12:15:00Z', '2026-03-31T09:00:00Z', '2026-03-30T14:22:00Z',
    '2026-03-29T08:55:00Z', '2026-03-28T16:40:00Z', '2026-03-27T11:10:00Z',
];

export const complaints = complaintsRaw.map((c, i) => ({
    ...c,
    timestamp: timestamps[i % timestamps.length],
    fullText: `Complaint regarding ${c.title.toLowerCase()}. The issue has been persisting for several days and has directly impacted the daily lives of residents in the affected area. Despite multiple verbal requests to local authorities, no action has been taken. Immediate intervention is requested.`,
    agentOutputs: {
        classifier: {
            category: c.category,
            subCategory: ['Primary Issue', 'Secondary Issue', 'Related Concern'][i % 3],
            confidence: c.confidence + 0.05 > 1 ? 0.95 : c.confidence + 0.05,
        },
        priority: {
            level: c.priority,
            urgencyScore: c.priority === 'Critical' ? Math.floor(Math.random() * 10) + 90
                : c.priority === 'High' ? Math.floor(Math.random() * 20) + 65
                    : c.priority === 'Medium' ? Math.floor(Math.random() * 20) + 40
                        : Math.floor(Math.random() * 20) + 10,
            reasoning: `Based on keywords and historical patterns, this complaint indicates ${c.priority.toLowerCase()} urgency affecting public welfare.`,
        },
        verifier: {
            authentic: c.verified,
            flag: c.verified ? 'AUTHENTIC' : 'UNCERTAIN',
            duplicateCheck: i % 5 === 0 ? 'POSSIBLE_DUPLICATE' : 'UNIQUE',
            confidence: c.confidence,
        },
        explainer: {
            summary: `The ${c.category} department (${c.department}) should address this within SLA. ${c.verified ? 'Complaint appears genuine.' : 'Authenticity uncertain — human review recommended.'}`,
            actionSuggested: c.priority === 'Critical' || !c.verified ? 'Escalate to senior officer' : 'Route to department automatically',
            estimatedResolutionTime: c.priority === 'Critical' ? '24 hours' : c.priority === 'High' ? '3 days' : '7 days',
        },
    },
    debate: [
        {
            agents: ['Priority Agent', 'Verifier Agent'],
            conflict: !c.verified && (c.priority === 'Critical' || c.priority === 'High'),
            message: !c.verified && (c.priority === 'Critical' || c.priority === 'High')
                ? `Priority Agent assigns ${c.priority} urgency, but Verifier is UNCERTAIN about authenticity. Human review strongly suggested.`
                : `All agents agree: ${c.priority} priority, routed to ${c.department}.`,
            severity: !c.verified && c.priority === 'Critical' ? 'high' : !c.verified ? 'medium' : 'low',
        }
    ],
}));

export const reviewQueue = complaints.filter(c => c.status === 'Human Review');

export const dailyComplaintsData = [
    { day: 'Mar 27', count: 18 }, { day: 'Mar 28', count: 24 }, { day: 'Mar 29', count: 15 },
    { day: 'Mar 30', count: 31 }, { day: 'Mar 31', count: 22 }, { day: 'Apr 01', count: 28 },
    { day: 'Apr 02', count: 12 },
];

export const resolutionRateData = [
    { day: 'Mar 27', rate: 72 }, { day: 'Mar 28', rate: 68 }, { day: 'Mar 29', rate: 81 },
    { day: 'Mar 30', rate: 61 }, { day: 'Mar 31', rate: 75 }, { day: 'Apr 01', rate: 79 },
    { day: 'Apr 02', rate: 84 },
];

export const aiVsHumanData = [
    { month: 'Jan', ai: 340, human: 120 }, { month: 'Feb', ai: 280, human: 145 },
    { month: 'Mar', ai: 410, human: 98 }, { month: 'Apr', ai: 180, human: 42 },
];

export const overrideFrequency = [
    { week: 'W1', overrides: 12 }, { week: 'W2', overrides: 8 }, { week: 'W3', overrides: 15 },
    { week: 'W4', overrides: 6 }, { week: 'W5', overrides: 10 }, { week: 'W6', overrides: 4 },
];

export const agentAccuracy = [
    { agent: 'Classifier', accuracy: 94.2, overrides: 28 },
    { agent: 'Priority', accuracy: 88.7, overrides: 52 },
    { agent: 'Verifier', accuracy: 91.4, overrides: 34 },
    { agent: 'Explainer', accuracy: 96.1, overrides: 15 },
];

export const activityLog = [
    { id: 1, complaintId: 'GRV-001', event: 'Complaint Received', agent: 'System', timestamp: '2026-04-02T04:12:00Z', type: 'system' },
    { id: 2, complaintId: 'GRV-001', event: 'AI Classification Complete', agent: 'Classifier Agent', timestamp: '2026-04-02T04:12:05Z', type: 'ai' },
    { id: 3, complaintId: 'GRV-001', event: 'Priority Assigned: Critical', agent: 'Priority Agent', timestamp: '2026-04-02T04:12:06Z', type: 'ai' },
    { id: 4, complaintId: 'GRV-001', event: 'Verifier flagged: UNCERTAIN — sent to Human Review', agent: 'Verifier Agent', timestamp: '2026-04-02T04:12:08Z', type: 'ai' },
    { id: 5, complaintId: 'GRV-001', event: 'Pending officer assignment', agent: 'System', timestamp: '2026-04-02T04:15:00Z', type: 'system' },
    { id: 6, complaintId: 'GRV-003', event: 'Complaint Received', agent: 'System', timestamp: '2026-04-01T18:00:00Z', type: 'system' },
    { id: 7, complaintId: 'GRV-003', event: 'Auto-resolved — high confidence', agent: 'All Agents', timestamp: '2026-04-01T18:00:12Z', type: 'ai' },
    { id: 8, complaintId: 'GRV-003', event: 'Routed to DISCOM automatically', agent: 'Routing Agent', timestamp: '2026-04-01T18:00:15Z', type: 'ai' },
    { id: 9, complaintId: 'GRV-005', event: 'Complaint Received', agent: 'System', timestamp: '2026-03-31T09:00:00Z', type: 'system' },
    { id: 10, complaintId: 'GRV-005', event: 'AI Classification Complete', agent: 'Classifier Agent', timestamp: '2026-03-31T09:00:04Z', type: 'ai' },
    { id: 11, complaintId: 'GRV-005', event: 'Priority: High', agent: 'Priority Agent', timestamp: '2026-03-31T09:00:06Z', type: 'ai' },
    { id: 12, complaintId: 'GRV-005', event: 'Human review accepted AI decision', agent: 'Officer ID: 204', timestamp: '2026-03-31T10:22:00Z', type: 'human' },
    { id: 13, complaintId: 'GRV-005', event: 'Resolved — notified complainant', agent: 'System', timestamp: '2026-03-31T14:10:00Z', type: 'resolved' },
];

export const stats = {
    total: complaints.length,
    highPriority: complaints.filter(c => c.priority === 'Critical' || c.priority === 'High').length,
    pendingReview: complaints.filter(c => c.status === 'Human Review').length,
    autoResolved: complaints.filter(c => c.status === 'Auto' || c.status === 'Resolved').length,
};
