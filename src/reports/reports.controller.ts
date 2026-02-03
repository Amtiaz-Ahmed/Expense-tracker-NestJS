import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GetUser } from '../common/decorators/get-user.decorator'; // Adjust path if needed
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guards'; // Adjust path if needed

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get('monthly')
    async getMonthlyReport(
        @GetUser() user: any,
        @Query('year') year: string,
        @Query('month') month: string,
    ) {
        const currentYear = year ? parseInt(year) : new Date().getFullYear();
        const currentMonth = month ? parseInt(month) : new Date().getMonth() + 1;

        return this.reportsService.getMonthlyReport(user.userId, currentYear, currentMonth);
    }
}
