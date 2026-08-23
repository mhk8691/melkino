import {
  Accountant,
  AppUser,
  RealEstateAgency,
  RealEstateAgent,
  RegularUser,
  Secretary,
  SuperUser,
  UserRole,
} from "./UsersType";
export const fakeSuperUser: SuperUser = {
  id: "user-super-001",
  role: UserRole.SUPER_USER,
  firstName: "علی",
  lastName: "رضایی",
  phoneNumber: "09121234567",
  profileImage:'/images/user.png',
  canImpersonateUsers: true,
  createdAt: "2026-08-01T09:00:00.000Z",
  updatedAt: "2026-08-18T10:30:00.000Z",
};

export const fakeRealEstateAgency: RealEstateAgency = {
  id: "agency-001",
  role: UserRole.REAL_ESTATE_AGENCY,
  firstName: "محمد",
  lastName: "احمدی",
  phoneNumber: "09121112233",
  profileImage: '/images/user.png',
  agencyName: "املاک بزرگ شهر",
  logo: "/images/agencies/bozorg-shahr.png",
  managerImage: "/images/users/agency-manager.jpg",
  registrationData: {
    agencyName: "املاک بزرگ شهر",
    managerFirstName: "محمد",
    managerLastName: "احمدی",
    phoneNumber: "09121112233",
    nationalId: "0012345678",
    registrationNumber: "RE-1405-001",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۵",
    postalCode: "1435612345",
    licenseNumber: "LIC-458921",
  },
  createdAt: "2026-07-10T08:00:00.000Z",
  updatedAt: "2026-08-15T11:20:00.000Z",
};

export const fakeRealEstateAgent: RealEstateAgent = {
  id: "agent-001",
  role: UserRole.REAL_ESTATE_AGENT,
  firstName: "سارا",
  lastName: "کریمی",
  phoneNumber: "09129876543",
  profileImage:'/images/user.png',
  agencyId: fakeRealEstateAgency.id,
  agencyName: fakeRealEstateAgency.agencyName,
  registrationData: {
    firstName: "سارا",
    lastName: "کریمی",
    phoneNumber: "09129876543",
    nationalId: "0023456789",
    email: "sara.karimi@example.com",
    experienceYears: 5,
    specialty: "خرید و فروش ملک مسکونی",
    address: "تهران، منطقه ۵",
  },
  createdAt: "2026-07-20T09:15:00.000Z",
  updatedAt: "2026-08-16T14:10:00.000Z",
};

export const fakeRegularUser: RegularUser = {
  id: "user-001",
  role: UserRole.REGULAR_USER,
  firstName: "رضا",
  lastName: "محمدی",
  phoneNumber: "09351234567",
  profileImage: '/images/user.png',
  nationalId: "0034567890",
  registrationData: {
    firstName: "رضا",
    lastName: "محمدی",
    phoneNumber: "09351234567",
    nationalId: "0034567890",
    email: "reza.mohammadi@example.com",
    birthDate: "1375-04-18",
    address: "تهران، صادقیه",
    postalCode: "1456789012",
  },
  createdAt: "2026-08-02T12:00:00.000Z",
  updatedAt: "2026-08-17T08:45:00.000Z",
};

export const fakeAccountant: Accountant = {
  id: "accountant-001",
  role: UserRole.ACCOUNTANT,
  firstName: "مریم",
  lastName: "حسینی",
  phoneNumber: "09123456789",
  profileImage: '/images/user.png',
  agencyId: fakeRealEstateAgency.id,
  agencyName: fakeRealEstateAgency.agencyName,
  registrationData: {
    firstName: "مریم",
    lastName: "حسینی",
    phoneNumber: "09123456789",
    nationalId: "0045678901",
    email: "maryam.hosseini@example.com",
    accountingExperienceYears: 7,
    address: "تهران، جنت‌آباد",
    postalCode: "1478912345",
  },
  createdAt: "2026-07-25T10:30:00.000Z",
  updatedAt: "2026-08-12T16:00:00.000Z",
};

export const fakeSecretary: Secretary = {
  id: "secretary-001",
  role: UserRole.SECRETARY,
  firstName: "نگار",
  lastName: "موسوی",
  phoneNumber: "09127654321",
  profileImage:'/images/user.png',
  agencyId: fakeRealEstateAgency.id,
  agencyName: fakeRealEstateAgency.agencyName,
  registrationData: {
    firstName: "نگار",
    lastName: "موسوی",
    phoneNumber: "09127654321",
    nationalId: "0056789012",
    email: "negar.mousavi@example.com",
    address: "تهران، سعادت‌آباد",
    postalCode: "1987654321",
    workExperienceYears: 3,
  },
  createdAt: "2026-07-28T08:45:00.000Z",
  updatedAt: "2026-08-14T13:25:00.000Z",
};

/**
 * تمام کاربران فیک سیستم
 */
export const fakeUsers: AppUser[] = [
  fakeSuperUser,
  fakeRealEstateAgency,
  fakeRealEstateAgent,
  fakeRegularUser,
  fakeAccountant,
  fakeSecretary,
];
