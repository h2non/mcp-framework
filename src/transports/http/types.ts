import {
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCMessage,
  RequestId,
} from '@modelcontextprotocol/sdk/types.js';
import { AuthConfig } from '../../auth/types.js';

export { JSONRPCRequest, JSONRPCResponse, JSONRPCMessage, RequestId };

/**
 * Response mode enum
 */
export type ResponseMode = 'stream' | 'batch';

/**
 * CORS configuration options for HTTP Stream transport
 */
export interface CORSConfig {
  /**
   * Access-Control-Allow-Origin header
   * @default "*"
   */
  allowOrigin?: string;

  /**
   * Access-Control-Allow-Methods header
   * @default "GET, POST, OPTIONS"
   */
  allowMethods?: string;

  /**
   * Access-Control-Allow-Headers header
   * @default "Content-Type, Authorization, x-api-key"
   */
  allowHeaders?: string;

  /**
   * Access-Control-Expose-Headers header
   * @default "Content-Type, Authorization, x-api-key"
   */
  exposeHeaders?: string;

  /**
   * Access-Control-Max-Age header for preflight requests
   * @default "86400"
   */
  maxAge?: string;
}

/**
 * Configuration interface for the HTTP Stream transport
 */
export interface HttpStreamTransportConfig {
  /**
   * Port to run the HTTP server on, defaults to 8080
   */
  port?: number;

  /**
   * Endpoint path for MCP communication, defaults to "/mcp"
   */
  endpoint?: string;

  /**
   * Configure ping mechanism for connection health verification
   */
  ping?: {
    /**
     * Interval in milliseconds for sending ping requests
     * Set to 0 to disable pings
     * Default: 30000 (30 seconds)
     */
    frequency?: number;

    /**
     * Timeout in milliseconds for waiting for a ping response
     * Default: 10000 (10 seconds)
     */
    timeout?: number;
  };

  /**
   * Response mode: stream (Server-Sent Events) or batch (JSON)
   * Defaults to 'stream'
   */
  responseMode?: ResponseMode;

  /**
   * Timeout in milliseconds for batched messages
   * Only applies when responseMode is 'batch'
   */
  batchTimeout?: number;

  /**
   * Maximum message size in bytes
   */
  maxMessageSize?: number;

  /**
   * Authentication configuration
   */
  auth?: AuthConfig;

  /**
   * CORS configuration
   */
  cors?: CORSConfig;
}

/**
 * Default CORS configuration
 */
export const DEFAULT_CORS_CONFIG: CORSConfig = {
  allowOrigin: "*",
  allowMethods: "GET, POST, DELETE, OPTIONS",
  allowHeaders: "Content-Type, Accept, Authorization, x-api-key, Mcp-Session-Id",
  exposeHeaders: "Content-Type, Authorization, x-api-key, Mcp-Session-Id",
  maxAge: "86400"
};

export const DEFAULT_HTTP_STREAM_CONFIG: HttpStreamTransportConfig = {
  port: 8080,
  endpoint: '/mcp',
  responseMode: 'stream',
  batchTimeout: 30000,
  maxMessageSize: 4 * 1024 * 1024, // 4mb
  ping: {
    frequency: 30000, // 30 seconds
    timeout: 10000, // 10 seconds
  },
};
