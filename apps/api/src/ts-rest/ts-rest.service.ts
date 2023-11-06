import { Injectable } from '@nestjs/common';

const mockExample = {
  id: 'id',
  title: 'Hello TS-REST',
  description: 'description',
  content: 'content',
  published: true,
  tags: ['tags'],
};

@Injectable()
export class TsRestService {
  // constructor(private prisma: PrismaService) {}

  // Create
  async createExample(params: {
    title: string;
    content: string;
    published: boolean | undefined;
    description: string | undefined;
  }) {
    console.log(params);
    const example = mockExample;
    return example;
  }

  // Read
  async getExample(id: string) {
    console.log(id);
    const example = mockExample;
    return example ?? null;
  }

  // Update
  async updateExample(
    id: string,
    params: {
      title: string | undefined;
      content: string | undefined;
      published: boolean | undefined;
      description: string | undefined;
    },
  ) {
    console.log(id, params);
    const example = mockExample;
    return example;
  }

  // Delete
  async deleteExample(id: string) {
    console.log(id);
    return true;
  }

  // List
  async getExamples({
    take,
    skip,
    search,
  }: {
    take?: number;
    skip?: number;
    search?: string;
  }) {
    console.log(take, skip, search);
    const examples = [mockExample];
    const totalExamples = 1;
    return { examples, totalExamples };
  }
}
