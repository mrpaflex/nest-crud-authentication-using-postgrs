import { tagEntity } from "src/entities/tag.entity";
import { CreateUserEntity } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const confiDb: PostgresConnectionOptions = {
type: 'postgres',
host: 'localhost',
password: '12345',
port: 5432,
database: 'tagsDB',
username: 'postgres',
entities: [tagEntity, CreateUserEntity],
synchronize: true

}

export default confiDb;