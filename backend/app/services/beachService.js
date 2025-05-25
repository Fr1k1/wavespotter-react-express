import { supabase } from "../../supabaseClient.js";
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

  async getBeachesByType(typeId, page, pageSize) {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;
    try {
      const beaches = await db.models.Beach.findAll({
        where: { beach_type_id: typeId, approved: true },
        limit: limit,
        offset: offset,
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

  async getBeachGeoDataById(id) {
    try {
      const beach = await db.models.Beach.findOne({
        where: { id: Number(id) },
        attributes: ["name"], //return nothing from beach entity except name
        include: [
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
        ],
      });
      return beach || null;
    } catch (error) {
      return [];
    }
  }

  async getBeachImagesWithSignedUrls(id) {
    try {
      const beachImages = await this.getBeachImages(id);

      if (beachImages && beachImages.length > 0) {
        const signedUrlPromises = beachImages.map(async (image) => {
          const { data, error } = await supabase.storage
            .from("beach_images")
            .createSignedUrl(image.path, 7200);

          if (error) {
            console.error("Error creating URL:", error);
            return null;
          }

          return data.signedUrl;
        });

        const urls = await Promise.all(signedUrlPromises);
        return urls.filter((url) => url !== null);
      }

      return [];
    } catch (error) {
      console.error("Error processing beach images:", error);
      return [];
    }
  }

  async getFilteredBeaches(filters) {
    try {
      const {
        countryId,
        cityId,
        waterTypeId,
        beachTextureId,
        characteristicIds,
      } = filters;

      //svi drugi se koriste samo za filtriranje, ovo trebam za izracun
      let queryOptions = {
        attributes: ["id", "name"],
        include: [
          {
            model: db.models.Review,
            attributes: ["rating"],
          },
          {
            model: db.models.City,
            attributes: ["id", "name"],
          },
        ],
        where: { approved: true },
      };

      if (waterTypeId) {
        queryOptions.where.beach_type_id = waterTypeId;
      }

      if (beachTextureId) {
        queryOptions.where.beach_texture_id = beachTextureId;
      }

      if (cityId || countryId) {
        const cityInclude = {
          model: db.models.City,
          attributes: [],
          required: true,
          where: {},
        };

        if (cityId) {
          cityInclude.where.id = cityId;
        }

        if (countryId) {
          cityInclude.include = [
            {
              model: db.models.Country,
              attributes: [],
              required: true,
              where: {
                id: countryId,
              },
            },
          ];
        }

        queryOptions.include.push(cityInclude);
      }

      if (characteristicIds && characteristicIds.length > 0) {
        characteristicIds.forEach((charId) => {
          queryOptions.include.push({
            model: db.models.Characteristic,
            attributes: [],
            through: {
              attributes: [],
            },
            where: {
              id: Number(charId),
            },
            required: true,
          });
        });
      }

      const filteredBeaches = await db.models.Beach.findAll(queryOptions);

      const result = await Promise.all(
        filteredBeaches.map(async (beach) => {
          const beachImages = await this.getBeachImagesWithSignedUrls(beach.id);
          const firstImageUrl = beachImages.length > 0 ? beachImages[0] : null;

          let avgRating = 0;
          if (beach.reviews && beach.reviews.length > 0) {
            const totalRating = beach.reviews.reduce(
              (sum, review) => sum + review.rating,
              0
            );
            avgRating = totalRating / beach.reviews.length;
          }

          return {
            id: beach.id,
            name: beach.name,
            image: firstImageUrl,
            avgRating: avgRating,
          };
        })
      );

      return result;
    } catch (error) {
      console.error("Error in getFilteredBeaches service:", error);
      return [];
    }
  }
}

export default new BeachService();
