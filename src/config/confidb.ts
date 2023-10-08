import { ArticleEntity } from "src/entities/article.entity";
import { tagEntity } from "src/entities/tag.entity";
import { CreateUserEntity } from "src/entities/user.entity";
import { followEntity } from "src/profile/entity/follow.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

require('dotenv').config()
const confiDb: PostgresConnectionOptions = {
type: 'postgres',
host: process.env.DB_HOST,
password: process.env.DB_PASSWORD,
port: +process.env.DB_PORT,
database: process.env.DB_DATABASE,
username: process.env.DB_USERNAME,
entities: [tagEntity, CreateUserEntity, ArticleEntity, followEntity],
synchronize: true

}

export default confiDb;