import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import confiDb from './config/confidb';
import { AuthMiddleware } from './user/middleware/auth.middleware';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [TypeOrmModule.forRoot(confiDb), TagModule, UserModule, ArticlesModule]
})
export class AppModule {
  //this make this middleware global middleware
configure(consumer: MiddlewareConsumer){
  consumer.apply(AuthMiddleware).forRoutes({
    path: '*',
    method: RequestMethod.ALL,
  })
}
}
