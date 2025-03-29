import db from "../models/index.js";

class BeachService {
  async addBeach(beachData) {
    console.log("Beach Data:", beachData);
    const transaction = await db.sequelize.transaction();
    try {
      const newBeach = await db.models.Beach.create(beachData, { transaction });

      const allCharacteristics = [
        ...beachData.characteristics.map((charId) => ({
          beach_id: newBeach.id,
          characteristic_id: parseInt(charId, 10),
          featured: false,
        })),
        ...beachData.featured_items.map((charId) => ({
          beach_id: newBeach.id,
          characteristic_id: parseInt(charId, 10),
          featured: true,
        })),
      ];

      console.log("All Characteristic Entries:", allCharacteristics);
      for (const entry of allCharacteristics) {
        try {
          await db.sequelize.query(
            "INSERT INTO beach_has_characteristics (featured, characteristic_id, beach_id) VALUES (:featured, :characteristic_id, :beach_id)",
            {
              replacements: {
                featured: entry.featured,
                characteristic_id: entry.characteristic_id,
                beach_id: entry.beach_id,
              },
              type: db.sequelize.QueryTypes.INSERT,
              transaction,
            }
          );
        } catch (error) {
          console.error(
            `Error inserting entry: ${JSON.stringify(entry)}`,
            error
          );
          throw error;
        }
      }

      await transaction.commit();
      return newBeach;
    } catch (error) {
      await transaction.rollback();
      console.error("Error in addBeach service:", error);
      throw error;
    }
  }

  //get beach by type, by city- to mi treba za homepage
  //filtriranje mi treba za filter
  //trebam gettanje prema ratingu, ali jos nemam implementirane recenzije
  //beach by id mi isto treba za beach details

  async getBeachesByType(typeId) {
    try {
      const beaches = await db.models.Beach.findAll({
        where: { beach_type_id: typeId },
        include: [
          {
            model: db.models.City,
            attributes: ["name", "latitude", "longitude"],
            include: [
              {
                model: db.models.Country,
                attributes: ["name"],
              },
            ],
          },
          {
            model: db.models.Review,
            attributes: ["title", "description", "rating"],
          },
        ],
      });
      return beaches;
    } catch (error) {
      return [];
    }
  }

  async getBeachById(id) {
    try {
      const beach = await db.models.Beach.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: db.models.BeachTexture,
            attributes: ["name", "img_url"],
          },
          {
            model: db.models.BeachType,
            attributes: ["name"],
          },
          {
            model: db.models.BeachDepth,
            attributes: ["description"],
          },

          //moram ovak jer grad nije direktno povezan na plazu
          {
            model: db.models.City,
            attributes: ["name", "latitude", "longitude"],
            include: [
              {
                model: db.models.Country,
                attributes: ["id", "name"],
              },
            ],
          },

          {
            model: db.models.User,
            attributes: ["first_name", "last_name"],
          },

          {
            model: db.models.Review,
            attributes: ["title", "description", "rating"],
            include: [
              {
                model: db.models.User,
                attributes: ["first_name", "last_name"],
              },
            ],
          },
          {
            model: db.models.Characteristic,
            attributes: ["id", "name", "icon_url"],
            through: {
              model: db.models.BeachHasCharacteristic,
              attributes: ["featured"],
            },
          },
        ],
      });
      return beach || null;
    } catch (error) {
      return [];
    }
  }

  async getBeachImages(id) {
    try {
      const beach = await db.models.Beach.findOne({
        where: { id },
        include: [
          {
            model: db.models.Image,
            attributes: ["path"],
          },
        ],
      });
      if (beach && beach.images) {
        return beach.images;
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  async getBeaches(page, pageSize, approved) {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;
    let whereClause = {};
    const approvedValue = approved !== null ? Number(approved) : null;
    if (approvedValue === 0 || approvedValue === 1) {
      whereClause = { approved: approvedValue === 1 };
    }

    try {
      const beaches = await db.models.Beach.findAll({
        limit: limit,
        offset: offset,
        include: [
          {
            model: db.models.BeachTexture,
            attributes: ["name", "img_url"],
          },
          {
            model: db.models.BeachType,
            attributes: ["name"],
          },
          {
            model: db.models.BeachDepth,
            attributes: ["description"],
          },

          //moram ovak jer grad nije direktno povezan na plazu
          {
            model: db.models.City,
            attributes: ["name", "latitude", "longitude"],
            include: [
              {
                model: db.models.Country,
                attributes: ["name"],
              },
            ],
          },

          {
            model: db.models.User,
            attributes: ["first_name", "last_name"],
          },

          {
            model: db.models.Review,
            attributes: ["title", "description", "rating"],
            include: [
              {
                model: db.models.User,
                attributes: ["first_name", "last_name"],
              },
            ],
          },
          {
            model: db.models.Characteristic,
            attributes: ["name", "icon_url"],
            through: {
              model: db.models.BeachHasCharacteristic,
              attributes: ["featured"],
            },
          },
        ],
        where: whereClause,
      });
      return beaches;
    } catch (error) {
      return [];
    }
  }

  async updateBeach(id, beachData) {
    console.log("Updating Beach Data:", beachData);
    const transaction = await db.sequelize.transaction();
    try {
      const beach = await db.models.Beach.findByPk(id, { transaction });

      if (!beach) {
        throw new Error(`Beach with ID ${id} not found`);
      }

      await beach.update(beachData, { transaction });

      await db.sequelize.query(
        "DELETE FROM beach_has_characteristics WHERE beach_id = :beach_id",
        {
          replacements: { beach_id: id },
          type: db.sequelize.QueryTypes.DELETE,
          transaction,
        }
      );
      const allCharacteristics = [
        ...beachData.characteristics.map((charId) => ({
          beach_id: id,
          characteristic_id: parseInt(charId, 10),
          featured: false,
        })),
        ...beachData.featured_items.map((charId) => ({
          beach_id: id,
          characteristic_id: parseInt(charId, 10),
          featured: true,
        })),
      ];

      console.log("All Characteristic Entries for update:", allCharacteristics);
      for (const entry of allCharacteristics) {
        try {
          await db.sequelize.query(
            "INSERT INTO beach_has_characteristics (featured, characteristic_id, beach_id) VALUES (:featured, :characteristic_id, :beach_id)",
            {
              replacements: {
                featured: entry.featured,
                characteristic_id: entry.characteristic_id,
                beach_id: entry.beach_id,
              },
              type: db.sequelize.QueryTypes.INSERT,
              transaction,
            }
          );
        } catch (error) {
          console.error(
            `Error inserting entry: ${JSON.stringify(entry)}`,
            error
          );
          throw error;
        }
      }

      await transaction.commit();
      return beach;
    } catch (error) {
      await transaction.rollback();
      console.error("Error in updateBeach service:", error);
      throw error;
    }
  }
}

export default new BeachService();
