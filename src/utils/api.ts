import axios from "axios";

const BASE_URL = "https://www.varian.com";

export const fetchBlogs = async (locale = "en", limit = 3) => {
  // Construct the URL with the correct locale and limit
  const url =
    locale === "en"
      ? `${BASE_URL}/rest-api/varian-blog-data?_format=json&limit=${limit}`
      : `${BASE_URL}/${locale}/rest-api/varian-blog-data?_format=json&limit=${limit}`;

  console.log("Requesting URL:", url);  // Log the URL being requested

  try {
    const response = await axios.get(url);
    console.log("Fetched blogs data:", response.data);  // Log to check structure

    // Check if the response is structured correctly
    if (response.data && response.data.blogs && Array.isArray(response.data.blogs)) {
      return response.data.blogs;
    } else {
      console.log("Fetched blogs data:", response.data);
      console.error("Unexpected response structure:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
};
