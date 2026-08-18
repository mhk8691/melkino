// usersType.ts

export type UserId = string;

export interface BaseUser {
  id: UserId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImage?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface RealEstateAgency extends BaseUser {
  role: UserRole.REAL_ESTATE_AGENCY;
  agencyName: string;
  logo?: string | null;
  managerImage?: string | null;

  // تمام فیلدهای فرم ثبت‌نام املاک
  registrationData: Record<string, unknown>;
}

export interface RealEstateAgent extends BaseUser {
  role: UserRole.REAL_ESTATE_AGENT;
  agencyId: UserId;
  agencyName: string;

  // تمام فیلدهای فرم ثبت‌نام کارشناس
  registrationData: Record<string, unknown>;
}

export interface RegularUser extends BaseUser {
  role: UserRole.REGULAR_USER;
  nationalId: string;

  // تمام فیلدهای فرم ثبت‌نام کاربر عادی
  registrationData: Record<string, unknown>;
}

export interface Accountant extends BaseUser {
  role: UserRole.ACCOUNTANT;
  agencyId: UserId;
  agencyName: string;

  // تمام فیلدهای فرم ثبت‌نام حسابدار
  registrationData: Record<string, unknown>;
}

export interface Secretary extends BaseUser {
  role: UserRole.SECRETARY;
  agencyId: UserId;
  agencyName: string;

  // تمام فیلدهای فرم ثبت‌نام منشی
  registrationData: Record<string, unknown>;
}

export interface SuperUser extends BaseUser {
  role: UserRole.SUPER_USER;

  // سوپر یوزر می‌تواند با سطح دسترسی تعریف‌شده
  // وارد پنل سایر نقش‌ها شود.
  canImpersonateUsers: boolean;
}

export enum UserRole {
  SUPER_USER = "super_user",
  REAL_ESTATE_AGENCY = "real_estate_agency",
  REAL_ESTATE_AGENT = "real_estate_agent",
  REGULAR_USER = "regular_user",
  ACCOUNTANT = "accountant",
  SECRETARY = "secretary",
}

export type AppUser =
  | SuperUser
  | RealEstateAgency
  | RealEstateAgent
  | RegularUser
  | Accountant
  | Secretary;

/**
 * نقش‌هایی که سوپر یوزر اجازه ورود به پنل آن‌ها را دارد.
 * بهتر است در بک‌اند نیز همین دسترسی به‌صورت Permission/Policy کنترل شود.
 */
export type ImpersonatableRole =
  | UserRole.REAL_ESTATE_AGENCY
  | UserRole.REAL_ESTATE_AGENT
  | UserRole.REGULAR_USER
  | UserRole.ACCOUNTANT
  | UserRole.SECRETARY;

export interface UserListItem {
  id: UserId;
  role: UserRole;
  name: string;
  phoneNumber: string;
  profileImage?: string | null;
  nationalId?: string;
  agencyName?: string;
  logo?: string | null;
  managerImage?: string | null;
}

export interface UserDetails<TRegistrationData = Record<string, unknown>> {
  user: AppUser;
  registrationData: TRegistrationData;
}

/**
 * برای ورود موقت سوپر یوزر به پنل یک کاربر دیگر.
 * این مدل صرفاً TypeScript است و امنیت واقعی باید در Backend اعمال شود.
 */
export interface UserImpersonationSession {
  superUserId: UserId;
  targetUserId: UserId;
  targetRole: ImpersonatableRole;
  startedAt: string;
  expiresAt?: string;
}
