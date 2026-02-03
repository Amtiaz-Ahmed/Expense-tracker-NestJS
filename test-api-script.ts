
const BASE_URL = 'http://localhost:3000';
const USER_EMAIL = `testuser_${Date.now()}@example.com`; // Unique email for each run
const USER_PASSWORD = 'Password@123';
let authToken = '';

const color = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m'
};

function log(message: string, type: 'info' | 'success' | 'error' | 'header' = 'info') {
    switch (type) {
        case 'header': console.log(`\n${color.blue}=== ${message} ===${color.reset}`); break;
        case 'success': console.log(`${color.green}✔ ${message}${color.reset}`); break;
        case 'error': console.log(`${color.red}✖ ${message}${color.reset}`); break;
        default: console.log(message);
    }
}

async function request(method: string, endpoint: string, body?: any, token?: string) {
    try {
        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });

        const data = await res.json().catch(() => ({}));
        return { status: res.status, data };
    } catch (err) {
        console.error('Request failed:', err);
        return { status: 500, data: null };
    }
}

async function runTests() {
    log('Starting Full API Test Suite', 'header');

    // 1. Auth - Register
    log('Testing Authentication', 'header');
    let res = await request('POST', '/users/register', {
        name: 'Test User',
        email: USER_EMAIL,
        password: USER_PASSWORD
    });

    if (res.status === 201) log('User Registration Successful', 'success');
    else log(`User Registration Failed: ${JSON.stringify(res.data)}`, 'error');

    // 2. Auth - Login
    res = await request('POST', '/auth/login', {
        email: USER_EMAIL,
        password: USER_PASSWORD
    });

    if (res.status === 201 && res.data.accessToken) {
        authToken = res.data.accessToken;
        log('Login Successful, Token received', 'success');
    } else {
        log(`Login Failed: ${JSON.stringify(res.data)}`, 'error');
        return; // Stop if login fails
    }

    // 3. Category - Create
    log('Testing Categories', 'header');
    let categoryId: number;
    res = await request('POST', '/categories', {
        name: 'Test Category',
        icon: '🧪'
    }, authToken);

    if (res.status === 201) {
        categoryId = res.data.id;
        log(`Category Created (ID: ${categoryId})`, 'success');
    } else {
        log(`Category Creation Failed: ${JSON.stringify(res.data)}`, 'error');
        return;
    }

    // 4. Income - Create & Validation
    log('Testing Income', 'header');
    // 4a. Validation Error
    res = await request('POST', '/income', { amount: 5000 }, authToken); // Missing fields
    if (res.status === 400) log('Income Validation Logic Working (Missing fields rejected)', 'success');
    else log(`Income Validation Failed, expected 400 got ${res.status}`, 'error');

    // 4b. Success
    res = await request('POST', '/income', {
        amount: 50000,
        source: 'salary',
        description: 'Monthly Test Salary',
        incomeDate: '2026-02-01'
    }, authToken);

    if (res.status === 201) log('Income Created Successfully', 'success');
    else log(`Income Creation Failed: ${JSON.stringify(res.data)}`, 'error');

    // 5. Expense - Create & Validation
    log('Testing Expenses', 'header');

    // 5a. Success
    res = await request('POST', '/expense', {
        userId: 1, // DTO asks for valid userID, though usually taken from token
        amount: 5000,
        categoryId: categoryId,
        date: '2026-02-05',
        description: 'Test Expense'
    }, authToken);

    if (res.status === 201) log('Expense Created Successfully', 'success');
    else log(`Expense Creation Failed: ${JSON.stringify(res.data)}`, 'error');

    // 6. Reminders - Create & Foreign Key Error Check
    log('Testing Reminders', 'header');

    // 6a. Invalid Category (Should return 404 now)
    res = await request('POST', '/reminders', {
        title: 'Bill',
        amount: 100,
        categoryId: 999999, // Non-existent ID
        reminderDate: '2026-02-20'
    }, authToken);

    if (res.status === 404) log('Reminder Foreign Key Check Working (Invalid Category returns 404)', 'success');
    else log(`Reminder Foreign Key Check Failed, expected 404 got ${res.status}: ${JSON.stringify(res.data)}`, 'error');

    // 6b. Success
    res = await request('POST', '/reminders', {
        title: 'Valid Bill',
        amount: 100,
        categoryId: categoryId,
        reminderDate: '2026-02-20'
    }, authToken);

    if (res.status === 201) log('Reminder Created Successfully', 'success');
    else log(`Reminder Creation Failed: ${JSON.stringify(res.data)}`, 'error');


    // 7. Reports
    log('Testing Reports', 'header');
    res = await request('GET', '/reports/monthly?year=2026&month=2', null, authToken);

    if (res.status === 200) {
        log('Report API Successful', 'success');
        console.log(color.yellow, JSON.stringify(res.data, null, 2), color.reset);

        if (res.data.remainingBalance === 45000) {
            log('Balance Calculation Correct (50000 - 5000 = 45000)', 'success');
        } else {
            log(`Balance Calculation Mismatch. Expected 45000, got ${res.data.remainingBalance}`, 'error');
        }

    } else {
        log(`Report API Failed: ${JSON.stringify(res.data)}`, 'error');
    }

    log('\nTest Suite Completed', 'header');
}

runTests();
