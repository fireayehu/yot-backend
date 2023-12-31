export enum PermissionType {
  /**
   * PERMISSION
   */
  PERMISSION_CREATE = 'create_permission',
  PERMISSION_READ = 'read_permission',
  PERMISSION_UPDATE = 'update_permission',
  PERMISSION_DELETE = 'delete_permission',
  /**
   * ROLE
   */
  ROLE_CREATE = 'create_role',
  ROLE_READ = 'read_role',
  ROLE_UPDATE = 'update_role',
  ROLE_DELETE = 'delete_role',

  /**
   * USER
   */
  USER_CREATE = 'create_user',
  USER_READ = 'read_user',
  USER_UPDATE = 'update_user',
  USER_DELETE = 'delete_user',

  /**
   * STAFF
   */
  STAFF_CREATE = 'create_staff',
  STAFF_READ = 'read_staff',
  STAFF_UPDATE = 'update_staff',
  STAFF_DELETE = 'delete_staff',

  /**
   * INSTRUCTOR
   */
  INSTRUCTOR_CREATE = 'create_instructor',
  INSTRUCTOR_READ = 'read_instructor',
  INSTRUCTOR_UPDATE = 'update_instructor',
  INSTRUCTOR_DELETE = 'delete_instructor',

  /**
   * EDUCATION PLACE
   */
  EDUCATION_PLACE_CREATE = 'create_educationplace',
  EDUCATION_PLACE_READ = 'read_educationplace',
  EDUCATION_PLACE_UPDATE = 'update_educationplace',
  EDUCATION_PLACE_DELETE = 'delete_educationplace',

  /**
   * EDUCATION FIELD
   */
  EDUCATION_FIELD_CREATE = 'create_educationfield',
  EDUCATION_FIELD_READ = 'read_educationfield',
  EDUCATION_FIELD_UPDATE = 'update_educationfield',
  EDUCATION_FIELD_DELETE = 'delete_educationfield',

  /**
   * EDUCATION LEVEL
   */
  EDUCATION_LEVEL_CREATE = 'create_educationlevel',
  EDUCATION_LEVEL_READ = 'read_educationlevel',
  EDUCATION_LEVEL_UPDATE = 'update_educationlevel',
  EDUCATION_LEVEL_DELETE = 'delete_educationlevel',

  /**
   * CONTACT US
   */
  CONTACT_US_CREATE = 'create_contactus',
  CONTACT_US_READ = 'read_contactus',
  CONTACT_US_UPDATE = 'update_contactus',
  CONTACT_US_DELETE = 'delete_contactus',

  /**
   * SUB SERVICE
   */
  SUB_SERVICE_CREATE = 'create_subservice',
  SUB_SERVICE_READ = 'read_subservice',
  SUB_SERVICE_UPDATE = 'update_subservice',
  SUB_SERVICE_DELETE = 'delete_subservice',

  /**
   *  SERVICE
   */
  SERVICE_CREATE = 'create_service',
  SERVICE_READ = 'read_service',
  SERVICE_UPDATE = 'update_service',
  SERVICE_DELETE = 'delete_service',

  /**
   *  JOB LOCATION
   */
  JOB_LOCATION_CREATE = 'create_joblocation',
  JOB_LOCATION_READ = 'read_joblocation',
  JOB_LOCATION_UPDATE = 'update_joblocation',
  JOB_LOCATION_DELETE = 'delete_joblocation',

  /**
   *  JOB CATEGORY
   */
  JOB_CATEGORY_CREATE = 'create_jobacategory',
  JOB_CATEGORY_READ = 'read_jobacategory',
  JOB_CATEGORY_UPDATE = 'update_jobacategory',
  JOB_CATEGORY_DELETE = 'delete_jobacategory',

  /**
   *  JOB POST
   */
  JOB_POST_CREATE = 'create_jobpost',
  JOB_POST_READ = 'read_jobpost',
  JOB_POST_UPDATE = 'update_jobpost',
  JOB_POST_DELETE = 'delete_jobpost',

  /**
   *  TAG
   */
  TAG_CREATE = 'create_tag',
  TAG_READ = 'read_tag',
  TAG_UPDATE = 'update_tag',
  TAG_DELETE = 'delete_tag',

  /**
   *  CATEGORY
   */
  CATEGORY_CREATE = 'create_category',
  CATEGORY_READ = 'read_category',
  CATEGORY_UPDATE = 'update_category',
  CATEGORY_DELETE = 'delete_category',

  /**
   *  LANGUAGE
   */
  LANGUAGE_CREATE = 'create_language',
  LANGUAGE_READ = 'read_language',
  LANGUAGE_UPDATE = 'update_language',
  LANGUAGE_DELETE = 'delete_language',

  /**
   *  JOB APPLICATION
   */
  JOB_APPLICATION_CREATE = 'create_jobapplication',
  JOB_APPLICATION_READ = 'read_jobapplication',
  JOB_APPLICATION_UPDATE = 'update_jobapplication',
  JOB_APPLICATION_DELETE = 'delete_jobapplication',

  /**
   *  COURSE
   */
  COURSE_CREATE = 'create_course',
  COURSE_READ = 'read_course',
  COURSE_UPDATE = 'update_course',
  COURSE_DELETE = 'delete_course',

  /**
   *  COURSE DISCOUNT
   */
  COURSE_DISCOUNT_CREATE = 'create_coursediscount',
  COURSE_DISCOUNT_READ = 'read_coursediscount',
  COURSE_DISCOUNT_UPDATE = 'update_coursediscount',
  COURSE_DISCOUNT_DELETE = 'delete_coursediscount',

  /**
   *  COURSE TAG
   */
  COURSE_TAG_CREATE = 'create_coursetag',
  COURSE_TAG_READ = 'read_coursetag',
  COURSE_TAG_UPDATE = 'update_coursetag',
  COURSE_TAG_DELETE = 'delete_coursetag',

  /**
   *  COURSE LANGUAGE
   */
  COURSE_LANGUAGE_CREATE = 'create_courselanguage',
  COURSE_LANGUAGE_READ = 'read_courselanguage',
  COURSE_LANGUAGE_UPDATE = 'update_courselanguage',
  COURSE_LANGUAGE_DELETE = 'delete_courselanguage',

  /**
   * PREREQUISITE
   */
  PREREQUISITE_CREATE = 'create_prerequisite',
  PREREQUISITE_READ = 'read_prerequisite',
  PREREQUISITE_UPDATE = 'update_prerequisite',
  PREREQUISITE_DELETE = 'delete_prerequisite',

  /**
   * MODULE
   */
  MODULE_CREATE = 'create_module',
  MODULE_READ = 'read_module',
  MODULE_UPDATE = 'update_module',
  MODULE_DELETE = 'delete_module',

  /**
   * SECTION
   */
  SECTION_CREATE = 'create_section',
  SECTION_READ = 'read_section',
  SECTION_UPDATE = 'update_section',
  SECTION_DELETE = 'delete_section',

  /**
   * LESSON
   */
  LESSON_CREATE = 'create_lesson',
  LESSON_READ = 'read_lesson',
  LESSON_UPDATE = 'update_lesson',
  LESSON_DELETE = 'delete_lesson',

  /**
   * BLOG CATEGORY
   */
  BLOG_CATEGORY_CREATE = 'create_blogcategory',
  BLOG_CATEGORY_READ = 'read_blogcategory',
  BLOG_CATEGORY_UPDATE = 'update_blogcategory',
  BLOG_CATEGORY_DELETE = 'delete_blogcategory',

  /**
   * BLOG POST
   */
  BLOG_POST_CREATE = 'create_blogpost',
  BLOG_POST_READ = 'read_blogpost',
  BLOG_POST_UPDATE = 'update_blogpost',
  BLOG_POST_DELETE = 'delete_blogpost',

  /**
   * USER SUB SERVICE
   */
  USER_SUB_SERVICE_CREATE = 'create_usersubservice',
  USER_SUB_SERVICE_READ = 'read_usersubservice',
  USER_SUB_SERVICE_UPDATE = 'update_usersubservice',
  USER_SUB_SERVICE_DELETE = 'delete_usersubservice',

  /**
   * SESSION
   */
  SESSION_CREATE = 'create_session',
  SESSION_READ = 'read_session',
  SESSION_UPDATE = 'update_session',
  SESSION_DELETE = 'delete_session',
}
