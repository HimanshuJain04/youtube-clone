"use server";
import client from "@/db";


const categories = [
    "Art & Design",
    "Beauty & Fashion",
    "Comedy",
    "Education",
    "Entertainment",
    "Family Entertainment",
    "Film & Animation",
    "Food",
    "Gaming",
    "Health & Fitness",
    "How-to & Style",
    "Music",
    "News & Politics",
    "Nonprofits & Activism",
    "People & Blogs",
    "Pets & Animals",
    "Science & Technology",
    "Sports",
    "Travel & Events",
    "Vehicles"
];

export async function fetchCategories() {

    try {

        return categories;

    } catch (error) {
        console.log("Error: fetchCategories:  ", error)
        throw new Error("zFailed to fetch all categories");
    }
}