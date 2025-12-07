import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhookService {
  private readonly n8nWebhookUrl = 'http://192.168.0.228:5678/webhook-test/31db848d-10b2-4d20-9470-bbe94a79bc67';

  /**
   * Send data to n8n webhook
   */
  async sendToN8n(payload: any): Promise<any> {
    try {
      const response = await axios.post(this.n8nWebhookUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      return {
        success: true,
        data: response.data,
        message: 'Data sent to n8n webhook successfully',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to send data to n8n webhook',
      };
    }
  }

  /**
   * Receive and process webhook data from n8n
   */
  async processWebhookData(payload: any): Promise<any> {
    try {
      // Process the incoming webhook data
      const processedData = {
        receivedAt: new Date().toISOString(),
        payload,
        status: 'processed',
      };
      return {
        success: true,
        data: processedData,
        message: 'Webhook data processed successfully',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to process webhook data',
      };
    }
  }
}
