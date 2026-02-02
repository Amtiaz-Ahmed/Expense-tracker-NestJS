const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
const uniqueId = Date.now();
const user = {
    name: `Test User ${uniqueId}`,
    email: `test${uniqueId}@example.com`,
    password: 'Password123!'
};

async function runVerify() {
    try {
        console.log('1. Registering user...');
        await axios.post(`${BASE_URL}/users/register`, user);
        console.log('✅ Registration successful');

        console.log('2. Logging in...');
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email: user.email,
            password: user.password
        });
        const token = loginRes.data.accessToken;
        console.log('✅ Login successful, token received');

        const headers = { Authorization: `Bearer ${token}` };

        console.log('3. Creating category...');
        const catRes = await axios.post(`${BASE_URL}/categories`, {
            name: 'Income Category',
            icon: '💰'
        }, { headers });
        const categoryId = catRes.data.id;
        console.log('✅ Category created, ID:', categoryId);

        console.log('4. Creating income (Standard payload)...');
        const incomePayload = {
            amount: 5000,
            source: 'salary',
            categoryId: categoryId,
            incomeDate: '2026-02-01',
            description: 'Monthly Salary'
        };
        const incomeRes = await axios.post(`${BASE_URL}/income`, incomePayload, { headers });
        console.log('✅ Income created successfully:', incomeRes.data.id);

        console.log('5. Creating income (String numbers payload)...');
        const incomeStringPayload = {
            amount: "100",
            source: 'freelance',
            categoryId: categoryId.toString(), // Testing string conversion
            incomeDate: '2026-02-01',
            description: 'Freelance Work'
        };
        const incomeStringRes = await axios.post(`${BASE_URL}/income`, incomeStringPayload, { headers });
        console.log('✅ Income (string payload) created successfully:', incomeStringRes.data.id);

    } catch (error) {
        console.error('❌ Verification failed');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

runVerify();
