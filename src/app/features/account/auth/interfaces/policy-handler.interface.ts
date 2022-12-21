interface IPolicyHandler {
  handle(permissions: string[]): boolean;
}

type PolicyHandlerCallback = (permissions: string[]) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
