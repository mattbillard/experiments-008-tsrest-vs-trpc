import { Controller } from '@nestjs/common';
import { tsRestApi } from './ts-rest.contract';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { TsRestService } from './ts-rest.service';

const c = nestControllerContract(tsRestApi);
type RequestShapes = NestRequestShapes<typeof c>;

// You can implement the NestControllerInterface interface to ensure type safety
@Controller()
export class TsRestController implements NestControllerInterface<typeof c> {
  constructor(private readonly tsRestService: TsRestService) {}
  // Create
  @TsRest(c.createExample)
  async createExample(
    @TsRestRequest() { body }: RequestShapes['createExample'],
  ) {
    const example = await this.tsRestService.createExample({
      title: body.title,
      content: body.content,
      published: body.published,
      description: body.description,
    });

    return { status: 201 as const, body: example };
  }

  // Read
  @TsRest(c.getExample)
  async getExample(
    @TsRestRequest() { params: { id } }: RequestShapes['getExample'],
  ) {
    const example = await this.tsRestService.getExample(id);

    if (!example) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: example };
  }

  // Update
  @TsRest(c.updateExample)
  async updateExample(
    @TsRestRequest() { params: { id }, body }: RequestShapes['updateExample'],
  ) {
    const example = await this.tsRestService.updateExample(id, {
      title: body.title,
      content: body.content,
      published: body.published,
      description: body.description,
    });

    return { status: 200 as const, body: example };
  }

  // Delete
  @TsRest(c.deleteExample)
  async deleteExample(
    @TsRestRequest() { params: { id } }: RequestShapes['deleteExample'],
  ) {
    await this.tsRestService.deleteExample(id);

    return { status: 200 as const, body: { message: 'Example Deleted' } };
  }

  // List
  @TsRest(c.getExamples)
  async getExamples(
    @TsRestRequest()
    {
      query: { take, skip, search },
      headers: { 'x-pagination': pagination },
    }: RequestShapes['getExamples'],
  ) {
    const { examples, totalExamples } = await this.tsRestService.getExamples({
      take,
      skip,
      search,
    });

    return {
      status: 200 as const,
      body: { examples, count: totalExamples, skip, take, pagination },
    };
  }
}
