import mongoose, { Schema, Document } from "mongoose";

interface ContactInformation {
  location?: string;
  phoneNumber?: string;
  emailAddress?: string;
  linkedIn?: string;
  github?: string;
  other?: string[];
}

interface Project {
  client?: string;
  title: string;
  startDate?: Date;
  endDate?: Date;
  location?: String;
  description?: string;
  descriptionBulletPoints?: string[];
  toolList?: string[];
}

interface Experience {
  company?: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  description?: string;
  descriptionBulletPoints?: string[];
  projects?: Project[];
  toolList?: string[];
}

interface Skills {
  skillGroup?: string;
  skillList?: string[];
}

interface Education {
  institution: string;
  location?: string;
  degree?: string;
  major?: string[];
  minor?: string[];
  startDate?: Date;
  endDate?: Date;
  gpa?: number;
}

export interface IResume extends Document {
  name: string;
  jobTitle?: string[];
  contactInformation?: ContactInformation;
  summary?: string;
  experience?: Experience[];
  skills?: Skills[];
  education?: Education[];
  personalProjects?: any[];
  other?: any[];
}

const ResumeSchema = new Schema<IResume>({
  name: { type: String, required: true },
  jobTitle: [String],
  contactInformation: {
    location: String,
    phoneNumber: String,
    emailAddress: String,
    linkedIn: String,
    github: String,
    other: [String],
  },
  summary: String,
  experience: [
    {
      company: String,
      title: String,
      startDate: Date,
      endDate: Date,
      location: String,
      description: String,
      descriptionBulletPoints: [String],
      toolList: [String],
      projects: [
        {
          client: String,
          title: String,
          startDate: Date,
          endDate: Date,
          location: String,
          description: String,
          descriptionBulletPoints: [String],
          toolList: [String],
        },
      ],
    },
  ],
  skills: [
    {
      skillGroup: String,
      skillList: [String],
    },
  ],
  education: [
    {
      institution: String,
      location: String,
      degree: String,
      major: [String],
      minor: [String],
      startDate: Date,
      endDate: Date,
      gpa: Number,
    },
  ],
});

export default mongoose.model<IResume>("Resume", ResumeSchema);
