import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Expense } from './expense.model';

@Table({ tableName: 'expense_receipts' })
export class ExpenseReceipt extends Model<ExpenseReceipt> {
    @ForeignKey(() => Expense)
    @Column({ type: DataType.INTEGER })
    expenseId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    imageUrl: string;

    @BelongsTo(() => Expense)
    expense: Expense;
}