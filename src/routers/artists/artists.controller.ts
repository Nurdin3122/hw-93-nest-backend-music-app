import { Controller, Get, Param } from '@nestjs/common';

@Controller('artists')
export class ArtistsController {
  @Get()
  getAll() {
    return "all artists will be here";
  }

  @Get(":id")
  getOne(@Param("id") id:string) {
    return "Artist id is " + id;
  }
}
