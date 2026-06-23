/**
 * DecodeLabs Industrial Training Kit - Project 2
 * Track: Full Stack Development (Backend API Development)
 * Focus: The Nervous System - Engineering the Backend API & Architectural Integrity
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads (Data Ingress Point)
app.use(express.json());

// In-Memory Data Store (Adhering to RESTful stateless server architectures for session data)
// Simulates data persistence layer without complex DB scaling rules yet
let users = [
    { id: 1, name: "Martina Plantijn", email: "martina@decodelabs.com" },
    { id: 2, name: "Jane Doe", email: "jane.doe@example.com" }
];

let posts = [
    { id: 1, userId: 1, title: "Architectural Integrity", content: "Project 1 was the skin. Project 2 is the life." }
];

// ==========================================
// 1. RESTFUL ENDPOINTS (The Healthy Organism)
// ==========================================

/**
 * REQUIREMENT: Create API endpoints (GET)
 * RESOURCE: Users Collection
 * SPEC: GET /users (Correct RESTful naming: Resources are Nouns)
 */
app.get('/users', (req, res, next) => {
    try {
        // IPO Model - INPUT: None required for global fetch
        // IPO Model - PROCESS: Retrieve users array
        const activeUsers = users;

        // IPO Model - OUTPUT: Clean JSON Provision
        res.status(200).json({
            success: true,
            status: "STABLE",
            count: activeUsers.length,
            data: activeUsers
        });
    } catch (error) {
        next(error); // Forward to Error Handling Protocol
    }
});

/**
 * REQUIREMENT: Create API endpoints (POST)
 * REQUIREMENT: Handle user input & Validate basic data
 * SPEC: POST /users (Correct RESTful naming: Nouns, not /createUser)
 */
app.post('/users', (req, res, next) => {
    try {
        // IPO Model - INPUT: Extracting data ingress points from request body
        const { name, email } = req.body;

        // IPO Model - PROCESS: Basic Data Validation Layer
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({
                success: false,
                error: "Validation Failed",
                message: "A valid string 'name' is mandatory."
            });
        }

        if (!email || !email.includes('@') || !email.includes('.')) {
            return res.status(400).json({
                success: false,
                error: "Validation Failed",
                message: "A valid structured 'email' address is mandatory."
            });
        }

        // Check for duplicate emails to prevent state pollution
        const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            return res.status(409).json({
                success: false,
                error: "Conflict",
                message: "An organism with this email address already exists."
            });
        }

        // Process State Mutation
        const newUser = {
            id: users.length + 1,
            name: name.trim(),
            email: email.toLowerCase().trim()
        };
        users.push(newUser);

        // IPO Model - OUTPUT: Success Provision Response
        res.status(201).json({
            success: true,
            message: "User resource initialized successfully",
            data: newUser
        });
    } catch (error) {
        next(error);
    }
});

/**
 * REQUIREMENT: Advanced Resource Nesting (The Language of Nerves)
 * SPEC: GET /users/{id}/posts
 */
app.get('/users/:id/posts', (req, res, next) => {
    try {
        // IPO Model - INPUT: Extract route parameters
        const userId = parseInt(req.params.id, 10);

        // Validate Input Parameter
        if (isNaN(userId)) {
            return res.status(400).json({
                success: false,
                error: "Bad Request",
                message: "User ID parameter must be a numerical value."
            });
        }

        // IPO Model - PROCESS: Verify parent resource exists
        const userExists = users.some(u => u.id === userId);
        if (!userExists) {
            return res.status(404).json({
                success: false,
                error: "Not Found",
                message: `User resource with ID ${userId} does not exist.`
            });
        }

        // Filter sub-resource collection
        const userPosts = posts.filter(p => p.userId === userId);

        // IPO Model - OUTPUT: Response delivery
        res.status(200).json({
            success: true,
            userId: userId,
            count: userPosts.length,
            data: userPosts
        });
    } catch (error) {
        next(error);
    }
});

/**
 * REQUIREMENT: Property Retrieval Endpoint
 * SPEC: GET /first-name
 */
app.get('/first-name', (req, res, next) => {
    try {
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found." });
        }
        
        // Split and extract the first name of the flagship user
        const primaryFirstName = users[0].name.split(' ')[0];

        res.status(200).json({
            success: true,
            resourceProperty: "first-name",
            value: primaryFirstName
        });
    } catch (error) {
        next(error);
    }
});


// ==========================================
// 2. ERROR HANDLING PROTOCOL (System Integrity Check)
// ==========================================

// Catch-all Route for non-existent endpoints to handle broken synaptic paths
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: "Endpoint Not Found",
        message: "The requested route is outside the mapped nervous system schema."
    });
});

// Centralized Error Handling Middleware (Ensuring System Resilience)
app.use((err, req, res, next) => {
    console.error("Critical Latency Path Error Loop:", err.stack);
    
    res.status(500).json({
        success: false,
        status: "MUTATION DETECTED",
        error: "Internal Server Error",
        message: "The application engine encountered an unexpected algorithmic anomaly."
    });
});

// Start the Server Engine
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` DecodeLabs Digital Engine - Project 2 Running`);
    console.log(` Server active on Data Ingress Port: http://localhost:${PORT}`);
    console.log(` System Integrity Check Status: STABLE`);
    console.log(`=======================================================`);
});