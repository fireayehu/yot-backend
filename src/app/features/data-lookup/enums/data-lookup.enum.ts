export enum ObjectState {
  DRAFT = 'object_state_draft',
  ACTIVE = 'object_state_active',
  INACTIVE = 'object_state_inactive',
  DELETED = 'objecjt_state_deleted',
  BLOCKED = 'object_state_blocked',
}

export enum RoleType {
  SUPER_ADMIN = 'role_type_superadmin',
  USER = 'role_type_user',
  INSTRUCTOR = 'role_type_instructor',
  CUSTOM = 'role_type_custom',
}

export enum DurationUnit {
  SECOND = 'duration_second',
  MINUTE = 'duration_minute',
  HOUR = 'duration_hour',
  DAY = 'duration_day',
  WEEK = 'duration_week',
  MONTH = 'duration_month',
  YEAR = 'duration_year',
}
