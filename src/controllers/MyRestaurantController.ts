import { Request, Response } from "express";
import Restaurant from "../models/restaurants";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

export const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    console.log("Check");
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({ error: "Restaurant already exists" });
    }

    // console.log("CHEck");

    // const image = req.file as Express.Multer.File;
    // const base64Image = Buffer.from(image.buffer).toString("base64");
    // const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
    //   folder: "food_ordering/hotel_products",
    // });

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    return res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong!" });
  }
};

export const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Error fetching restaurant" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
    folder: "food_ordering/hotel_products",
  });

  return uploadResponse.url;
};
