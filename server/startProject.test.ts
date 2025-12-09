import { describe, it, expect, vi, beforeEach } from 'vitest';
import { appRouter } from './routers';
import type { Context } from './_core/context';
import * as sendgridModule from './_core/sendgrid';

// Mock sendEmail function
vi.mock('./_core/sendgrid', () => ({
  sendEmail: vi.fn(),
}));

describe('startProject router', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;
  let mockContext: Context;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Create mock context
    mockContext = {
      user: null,
      req: {} as any,
      res: {} as any,
    };

    // Create tRPC caller
    caller = appRouter.createCaller(mockContext);
  });

  it('should submit project request and send emails', async () => {
    // Mock sendEmail to return true (success)
    vi.mocked(sendgridModule.sendEmail).mockResolvedValue(true);

    const projectData = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      projectType: 'AI Strategy & Marketing',
      budget: '$50,000 - $100,000',
      description: 'We need help implementing AI in our marketing strategy',
    };

    const result = await caller.startProject.submit(projectData);

    // Verify the result
    expect(result.success).toBe(true);
    expect(result.message).toBe('Project request submitted successfully');

    // Verify sendEmail was called twice (admin + client)
    expect(sendgridModule.sendEmail).toHaveBeenCalledTimes(2);

    // Verify admin email
    const adminEmailCall = vi.mocked(sendgridModule.sendEmail).mock.calls[0][0];
    expect(adminEmailCall.to).toBe('clement@nukleo.com');
    expect(adminEmailCall.subject).toContain('John Doe');
    expect(adminEmailCall.subject).toContain('Acme Corp');
    expect(adminEmailCall.html).toContain('john@example.com');
    expect(adminEmailCall.html).toContain('AI Strategy & Marketing');

    // Verify client email
    const clientEmailCall = vi.mocked(sendgridModule.sendEmail).mock.calls[1][0];
    expect(clientEmailCall.to).toBe('john@example.com');
    expect(clientEmailCall.subject).toContain('Thank you');
    expect(clientEmailCall.html).toContain('John');
    expect(clientEmailCall.html).toContain('24 hours');
  });

  it('should validate required fields', async () => {
    const invalidData = {
      name: '',
      email: 'invalid-email',
      company: '',
      projectType: '',
      budget: '',
      description: '',
    };

    await expect(caller.startProject.submit(invalidData)).rejects.toThrow();
  });

  it('should handle email sending failures gracefully', async () => {
    // Mock sendEmail to return false (failure)
    vi.mocked(sendgridModule.sendEmail).mockResolvedValue(false);

    const projectData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: 'Tech Inc',
      projectType: 'Digital Platforms',
      budget: '$25,000 - $50,000',
      description: 'Platform modernization project',
    };

    // Should still return success even if emails fail to send
    const result = await caller.startProject.submit(projectData);
    expect(result.success).toBe(true);
  });
});
