import { HttpStatus } from '@nestjs/common';

export const successMessage = {
  userCreated: {
    message: 'User created successfully',
    statusCode: HttpStatus.CREATED,
  },
  userLoggedIn: {
    message: 'User logged in successfully',
    statusCode: HttpStatus.OK,
  },
  forgotpasswordMessage: {
    message: 'Link sent successfully',
    statusCode: HttpStatus.OK,
  },
  deleteUser: {
    message: 'User deleted successfully',
    statusCode: HttpStatus.OK,
  },
  passwordReset: {
    message: 'Password reset successfully',
    statusCode: HttpStatus.OK,
  },
  profileUpdated: {
    message: 'Profile updated successfully',
    statusCode: HttpStatus.OK,
  },
  assessmentTaken: {
    message: 'Assessment taken successfully',
    statusCode: HttpStatus.CREATED,
  },
  assessmentFetched: {
    message: 'Assessment results fetched successfully',
    statusCode: HttpStatus.OK,
  },
  faqCreated: {
    message: 'FAQ created successfully',
    statusCode: HttpStatus.CREATED,
  },
  faqUpdated: {
    message: 'FAQ updated successfully',
    statusCode: HttpStatus.OK,
  },
  faqDeleted: {
    message: 'FAQ deleted successfully',
    statusCode: HttpStatus.OK,
  },
  faqFetched: {
    message: 'FAQs fetched successfully',
    statusCode: HttpStatus.OK,
  },
};

export const errorMessage = {
  userAlreadyExists: {
    message: 'User already exists',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  passwordMismatch: {
    message: 'Password and Confirm Password do not match',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  userNotFound: { message: 'User not found', statusCode: HttpStatus.NOT_FOUND },
  unauthorizedError: {
    message: 'Invalid credentials',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  authenticationFailed: {
    message: 'Invalid credentials',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  noAuthToken: {
    message: 'Unauthorized: No authentication token provided',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  invalidAuthToken: {
    message: 'Invalid authentication token',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  invalidUserId: {
    message: 'Invalid user ID',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  internalServerError: {
    message: 'Internal server error',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  assessmentNotFound: {
    message: 'No assessments found for the user',
    statusCode: HttpStatus.NOT_FOUND,
  },
  faqNotFound: {
    message: 'FAQ not found',
    statusCode: HttpStatus.NOT_FOUND,
  },
};
