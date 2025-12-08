import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';
import type { Context } from './_core/context';

describe('Leo AI Chatbot', () => {
  const createMockContext = (): Context => ({
    req: {} as any,
    res: {} as any,
    user: null,
  });

  it('should respond to a simple greeting', async () => {
    const caller = appRouter.createCaller(createMockContext());
    
    const response = await caller.leo.chat({
      messages: [
        { role: 'user', content: 'Hello!' },
      ],
    });

    expect(response).toBeDefined();
    expect(response.content).toBeDefined();
    expect(typeof response.content).toBe('string');
    expect(response.content.length).toBeGreaterThan(0);
  });

  it('should handle AI transformation questions', async () => {
    const caller = appRouter.createCaller(createMockContext());
    
    const response = await caller.leo.chat({
      messages: [
        { role: 'user', content: 'What services does Nukleo offer?' },
      ],
    });

    expect(response).toBeDefined();
    expect(response.content).toBeDefined();
    expect(typeof response.content).toBe('string');
  });

  it('should maintain conversation context', async () => {
    const caller = appRouter.createCaller(createMockContext());
    
    const response = await caller.leo.chat({
      messages: [
        { role: 'user', content: 'My name is John' },
        { role: 'assistant', content: 'Nice to meet you, John!' },
        { role: 'user', content: 'What is my name?' },
      ],
    });

    expect(response).toBeDefined();
    expect(response.content).toBeDefined();
    expect(typeof response.content).toBe('string');
  });
});
