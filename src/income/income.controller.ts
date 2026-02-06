import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('income')
@UseGuards(JwtAuthGuard)
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) { }

  @Post()
  create(@Body() createIncomeDto: CreateIncomeDto, @GetUser() user: any) {
    return this.incomeService.create(createIncomeDto, user.userId);
  }

  @Get()
  findAll(@GetUser() user: any) {
    return this.incomeService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @GetUser() user: any) {
    return this.incomeService.findOne(+id, user.userId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateIncomeDto: UpdateIncomeDto, @GetUser() user: any) {
    return this.incomeService.update(+id, updateIncomeDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @GetUser() user: any) {
    return this.incomeService.remove(+id, user.userId);
  }
}
