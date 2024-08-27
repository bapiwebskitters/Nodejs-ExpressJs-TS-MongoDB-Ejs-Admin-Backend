import User from "../models/User";
import { IUser } from "../interfaces/UserInterface";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
  // Method to get paginated users
  async getAllUser(
    page: number,
    pageSize: number
  ): Promise<{
    users: IUser[];
    totalCount: number;
    totalPages: number;
  }> {
    try {
      // Calculate pagination
      const skip = (page - 1) * pageSize;
      // Perform aggregation
      const result = await User.aggregate(
        [
          {
            $match: {
              isDeleted: false,
            },
          },
          {
            $facet: {
              paginatedResults: [
                { $skip: skip },
                { $limit: pageSize },
                { $sort: { _id: -1 } },
              ],
              totalCount: [{ $count: "count" }],
            },
          },
          {
            $project: {
              paginatedResults: 1,
              totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
              totalPages: {
                $ceil: {
                  $divide: [
                    { $arrayElemAt: ["$totalCount.count", 0] },
                    pageSize,
                  ],
                },
              },
            },
          },
        ],
        { allowDiskUse: true }
      );

      // Extract results
      const { paginatedResults, totalCount, totalPages } = result[0];

      return {
        users: paginatedResults,
        totalCount,
        totalPages,
      };
    } catch (err) {
      console.error("Error fetching users:", err);
      throw new Error("Error fetching users");
    }
  }
}
