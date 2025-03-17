import { environmentVariables } from '../../../config/environment-variables';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbDataSourceOptions: DataSourceOptions = {
  type: environmentVariables.STORAGE_TYPE as PostgresConnectionOptions['type'],
  url: environmentVariables.DATABASE_URL,
  entities: [ './**/*.entity{ .ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'db_migrations_typeorm',
  synchronize: false,
  migrationsRun: false,
};

const dbDataSource = new DataSource(dbDataSourceOptions);

export default dbDataSource;
export { dbDataSourceOptions };
