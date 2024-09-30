import { z } from "zod";

const GenderSchema = z.union([z.literal("male"), z.literal("female")]);

export const SetupProfileSchema = z.object({
  dob: z.string({ required_error: "This field is required" }),
  gender: GenderSchema,
  phone: z
    .string()
    .length(10, { message: "Phone number must be 10 digits long" })
    .regex(/^9\d{9}$/, { message: "Phone number format is invalid." }),
  country: z.string().optional().nullable(),
  province: z.string({ required_error: "This field is required" }),
  municipality: z.string({ required_error: "This field is required" }),
  brgy: z.string({ required_error: "This field is required" }),
  street: z.string({ required_error: "This field is required" }),
  zipcode: z.string({ required_error: "This field is required" }),
  profile_image: z.instanceof(File).nullable(),
  language: z.string().nullable().optional(),
  fb_page: z.string().nullable().optional(),
});

export const ProfileSchema = z.object({
  id: z.number().optional(),
  dob: z.string({ required_error: "This field is required" }),
  gender: GenderSchema,
  phone: z.string({ required_error: "This field is required" }),
  country: z.string().optional().nullable(),
  province: z.string({ required_error: "This field is required" }),
  municipality: z.string({ required_error: "This field is required" }),
  brgy: z.string({ required_error: "This field is required" }),
  street: z.string({ required_error: "This field is required" }),
  zipcode: z.string({ required_error: "This field is required" }),
  profile_image: z.instanceof(File).nullable(),
  nationality: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  fb_page: z.string().nullable().optional(),
  is_complete: z.string().nullable().optional(),
  user: z.number().optional().nullable(),
  complete_address: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  first_name: z
    .string()
    .regex(/^[A-Za-z]+$/, "First name should contain only letters"),
  last_name: z
    .string()
    .regex(/^[A-Za-z]*$/, "Last name should contain only letters"),
  email: z.string().email(),
  is_verified: z.boolean().optional(),
  is_active: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  role: z.string().optional(),
  profile: ProfileSchema.optional(),
  fullname: z.string(),
  is_roled: z.boolean(),
});

// class Document(models.Model):
//     #for organizers
//     production_page = models.CharField(max_length=255, null=True, blank=True)

//     doc_image1 = models.ImageField(upload_to="images/", null=True, blank=True)
//     doc_image2 = models.ImageField(upload_to="images/", null=True, blank=True)
//     doc_image3 = models.ImageField(upload_to="images/", null=True, blank=True)
//     doc_image4 = models.ImageField(upload_to="images/", null=True, blank=True)
//     doc_image5 = models.ImageField(upload_to="images/", null=True, blank=True)

//     #for bar owners
//     business_permit = models.ImageField(upload_to="images/",null=True, blank=True)

//     #for individual // all
//     government_id = models.ImageField(upload_to="images/", null=True, blank=True)
//     government_id_type = models.CharField(max_length=255, null=True, blank=True)

export const RolePickingSchema = z.object({
  category: z.string(), //bar|organizer|regular
  production_page: z.string().nullable(),
  organizer_images: z.array(z.instanceof(File)).nullable().optional(),
  business_permit: z.instanceof(File).nullable().optional(),
  government_id: z.instanceof(File),
  government_id_type: z.string(),
});
