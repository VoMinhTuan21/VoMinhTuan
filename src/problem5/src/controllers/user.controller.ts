import { Body, Controller, Delete, Get, Path, Post, Put, Queries, Route, SuccessResponse } from "tsoa";
import { User } from "../entities/user";
import { UsersService } from "../services/user.service";
import { CreateUserDTO, CreateUserSchema, UpdateUserDTO, UpdateUserSchema, UserFilter } from "../dto/user.dto";

@Route("users")
export class UsersController extends Controller {
	private usersService: UsersService;

	constructor() {
		super();
		this.usersService = new UsersService();
	}

  @Get()
  public async find(@Queries() filter: UserFilter) {
    return this.usersService.find(filter);
  }

	@Get("{userId}")
	public async getUser(@Path() userId: number): Promise<User> {
		return this.usersService.get(userId);
	}

	@SuccessResponse("201", "Created") // Custom success response
	@Post()
	public async createUser(@Body() requestBody: CreateUserDTO) {
		await CreateUserSchema.validate(requestBody, { abortEarly: false });
		const user = await this.usersService.create(requestBody);
		return user;
	}

	@SuccessResponse("201", "Updated") // Custom success response
	@Put()
	public async updateUser(@Body() requestBody: UpdateUserDTO) {
		await UpdateUserSchema.validate(requestBody, { abortEarly: false });
		const user = await this.usersService.update(requestBody);
		return user;
	}

	@SuccessResponse("201", "Deleted") // Custom success response
	@Delete("{userId}")
	public async deleteUser(@Path() userId: number) {
		return this.usersService.delete(userId);
	}
}
