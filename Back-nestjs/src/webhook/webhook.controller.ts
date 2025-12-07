import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { UsersService } from '../users/users.service';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly webhookService: WebhookService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Receive incoming webhook data from n8n and process it
   */
  @Post('receive')
  @HttpCode(HttpStatus.OK)
  async receiveWebhook(@Body() payload: any) {
    this.logger.log('Received webhook from n8n:', JSON.stringify(payload));
    
    // Process webhook data
    const processed = await this.webhookService.processWebhookData(payload);

    // Save to users if it's a user-related payload
    if (payload && (payload.firstName || payload.email || payload.name)) {
      try {
        this.usersService.saveUser(payload);
        this.logger.log('User data saved from webhook');
      } catch (error) {
        this.logger.error('Failed to save user data:', error);
      }
    }

    return processed;
  }

  /**
   * Send data to n8n webhook
   */
  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendToN8n(@Body() payload: any) {
    this.logger.log('Sending data to n8n webhook:', JSON.stringify(payload));
    return await this.webhookService.sendToN8n(payload);
  }

  /**
   * Health check for webhook
   */
  @Post('health')
  @HttpCode(HttpStatus.OK)
  async healthCheck() {
    this.logger.log('Webhook health check');
    return {
      status: 'ok',
      webhook: 'http://192.168.0.228:5678/webhook-test/22aaf383-809f-4642-ad69-81520e157bb8',
      timestamp: new Date().toISOString(),
    };
  }
}
