import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @GetUser() user: any) {
    return this.categoriesService.create(createCategoryDto, user.userId);
  }

  @Get()
  findAll(@GetUser() user: any) {
    return this.categoriesService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.categoriesService.findOne(+id, user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @GetUser() user: any) {
    return this.categoriesService.update(+id, updateCategoryDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: any) {
    return this.categoriesService.remove(+id, user.userId);
  }
}
