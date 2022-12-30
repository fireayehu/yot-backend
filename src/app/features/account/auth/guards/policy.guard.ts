import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '../decorator/policy.decorator';
import { PolicyHandler } from '../interfaces/policy-handler.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    const permissions = user.role.permissions
      .filter((permission: any) => permission.granted)
      .map((permission: any) => permission.permission.code);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, permissions),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, permissions: string[]) {
    if (typeof handler === 'function') {
      return handler(permissions);
    }
    return handler.handle(permissions);
  }
}
