const { gql, request } = require("graphql-request");
const moment = require("moment");

// Build MASTER_URL from environment variables
const MASTER_URL = `https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_MASTER_URL_KEY}/master`;

// Fetch categories
const getCategory = async () => {
  const query = gql`
    query Category {
      categories {
        bgcolor {
          hex
        }
        id
        name
        icon {
          url
        }
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Fetch all businesses
const getAllBusinessList = async () => {
  const query = gql`
    query BusinessList {
      businessLists {
        about
        address
        category {
          name
        }
        contactPerson
        email
        images {
          url
        }
        id
        name
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result.businessLists || [];
  } catch (error) {
    console.error("Error fetching business lists:", error);
    return [];
  }
};

// Fetch businesses by category
const getBusinessByCategory = async (category) => {
  const query = gql`
    query BusinessByCategory($categoryName: String!) {
      businessLists(where: { category: { name: $categoryName } }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;

  try {
    const variables = { categoryName: category };
    const result = await request(MASTER_URL, query, variables);
    console.log("API Response:", result);
    return result.businessLists || [];
  } catch (error) {
    console.error("Error in getBusinessByCategory:", error);
    return [];
  }
};

// Fetch business by ID
const getBusinessById = async (id) => {
  const query = gql`
    query BusinessById($businessId: ID!) {
      businessLists(where: { id: $businessId }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;

  try {
    const variables = { businessId: id };
    const result = await request(MASTER_URL, query, variables);
    return result.businessLists || [];
  } catch (error) {
    console.error("Error in getBusinessById:", error);
    return [];
  }
};

// Create a new booking
const createNewBooking = async (businessId, date, time, userEmail, userName) => {
  const formattedDate = moment(date).format('YYYY-MM-DD'); // Format date
  const mutationQuery = gql`
    mutation CreateBooking {
      createBooking(
        data: {
          bookingStatus: booked,
          businessList: { connect: { id: "${businessId}" } },
          date: "${formattedDate}",
          time: "${time}",
          userEmail: "${userEmail}",
          userName: "${userName}"
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
        count
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
};

// Fetch already booked slots for a business
const BusinessBookedSlot = async (businessId, date) => {
  const formattedDate = moment(date).format('YYYY-MM-DD'); // Format date
  const query = gql`
    query BusinessBookedSlot {
      bookings(where: { businessList: { id: "${businessId}" }, date: "${formattedDate}" }) {
        date
        time
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result.bookings || [];
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    return [];
  }
};

const GetUserBookingHistory=async(userEmail)=>{
  const query=gql`
  query GetUserBookingHistory {
  bookings(where: {userEmail: "`+userEmail+`"}
   orderBy: publishedAt_DESC) {
    businessList {
      name
      images {
        url
      }
      contactPerson
      address
    }
    date
    time
  }
}`

const result=await request(MASTER_URL,query)
return result;
}

// Export all functions
export default {
  getCategory,
  getAllBusinessList,
  getBusinessByCategory,
  getBusinessById,
  createNewBooking,
  BusinessBookedSlot,
  GetUserBookingHistory
};
