# n8n Webhook Integration

This project is now integrated with n8n webhook at: `http://192.168.0.228:5678/webhook-test/31db848d-10b2-4d20-9470-bbe94a79bc67`

## Webhook Endpoints

### 1. Receive Webhook Data
**Endpoint:** `POST /webhook/receive`

Receives data from n8n and processes it. If the payload contains user data (firstName, email, or name), it will automatically save it to the users database.

**Example Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "receivedAt": "2025-12-07T10:30:00.000Z",
    "payload": { ... },
    "status": "processed"
  },
  "message": "Webhook data processed successfully"
}
```

### 2. Send Data to n8n
**Endpoint:** `POST /webhook/send`

Send data from your application to the n8n webhook for further processing.

**Example Request:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Data sent to n8n webhook successfully"
}
```

### 3. Health Check
**Endpoint:** `POST /webhook/health`

Check if the webhook integration is working properly.

**Response:**
```json
{
  "status": "ok",
  "webhook": "http://192.168.0.228:5678/webhook-test/31db848d-10b2-4d20-9470-bbe94a79bc67",
  "timestamp": "2025-12-07T10:30:00.000Z"
}
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Application**
   ```bash
   npm start
   ```
   
   Or for development with hot reload:
   ```bash
   npm run start:dev
   ```

3. **Configure n8n**
   In your n8n workflow, configure the webhook to send data to:
   - `http://YOUR_SERVER_IP:3000/webhook/receive`

4. **Integration Flow**
   - n8n sends data → `/webhook/receive`
   - Data is processed and automatically saved to users database
   - Your app can also send data to n8n via `/webhook/send`

## Features

- ✅ Receive webhook payloads from n8n
- ✅ Automatically save user data from webhook payloads
- ✅ Send data from your application to n8n
- ✅ Health check endpoint
- ✅ Error handling and logging
- ✅ JSON data processing

## Architecture

```
n8n Webhook
    ↓
POST /webhook/receive
    ↓
WebhookController → WebhookService → UsersService
    ↓
JSON File Storage (users.json)
```

## Configuration

The n8n webhook URL is configured in `src/webhook/webhook.service.ts`:
```typescript
private readonly n8nWebhookUrl = 'http://192.168.0.228:5678/webhook-test/31db848d-10b2-4d20-9470-bbe94a79bc67';
```

If you need to change the webhook URL, update it in the `WebhookService` class.

## Logging

All webhook activities are logged. You can view logs in your console when running the application:
- Incoming webhook data
- Processed data
- Errors and exceptions
- Successful n8n sends
