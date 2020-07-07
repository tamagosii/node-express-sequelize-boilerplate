const HTTP_ERR_MSG = {
	200: 'OK - The request was successful',
	201: 'Created - The request was successful and a resource was created.',
	204: 'No Content - The request was successful but there is no representation to return (i.e. the response is empty)',
	400: 'Bad Request - The request could not be understood or was missing required parameters',
	401: `Unauthorized - Authentication failed or user doesn't have permissions for requested operation`,
	403: 'Forbidden - Access denied',
	404: 'Not Found - Resource was not found',
	405: 'Method Not Allowed - Requested method is not supported for resource',
	422: 'Unprocessable Entity - Unable to process the contained instructions',
	500: 'Internal Server Error. Please report to the administrator',
	DEFAULT: 'Internal Server Error',
};

export default class AdapterService {
	async create(model, payload, options = {}) {
		const data = await model.create(payload, {
			raw: options.raw || true,
			returning: options.returning || true,
			...options,
		});

		return data;
	}

	async deleteByID(model, id, options = {}) {
		let data = await model.destroy({ where: { id } }, options);

		data = {
			deleted: data === 1 ? true : false,
			message:
				data === 1
					? 'Delete data success'
					: 'There is no data within the database',
		};

		return data;
	}

	async flush(model, options) {
		let data = await model.destroy({ truncate: true }, options);

		return data;
	}

	async findByID(model, payload, options) {
		const { id } = payload;
		let data = await model.destroy({ where: { id } }, options);

		data = {
			deleted: data === 1 ? true : false,
			message:
				data === 1
					? 'Delete data success'
					: 'There is no data within the database',
		};

		return data;
	}

	static appendAuditrailAndID(DataTypes, columns) {
		return {
			...columns,
			createdAt: {
				field: 'created_at',
				type: DataTypes.DATE,
			},
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			updatedAt: {
				field: 'updated_at',
				type: DataTypes.DATE,
			},
		};
	}

	static generateHTTPStatus(status, data = {}) {
		const response = {
			meta: {
				status,
				message: HTTP_ERR_MSG[status],
			},
			data,
		};

		return response;
	}

	static sendErrorResponse(res, options) {
		if (options.transaction) options.transaction.rollback();
		res.status(500).send(this.generateHTTPStatus(500));
	}
}
