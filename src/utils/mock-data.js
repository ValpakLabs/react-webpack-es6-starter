module.exports = function(context) {
  
  let topAffiliateOfferData = [
    {
      title: "Save up to $250 on Tablets, Laptops, Printers and More",
      logoUrl: "https://d7olld39l2hok.cloudfront.net/logo/4216257.png",
      offerUrl: "https://www.valpak.com"
    },
    {
      title: "25% Online Purchases with Coupon Code",
      logoUrl: "https://d7olld39l2hok.cloudfront.net/images/savings/logo/4214410.png",
      offerUrl: "https://www.valpak.com"
    },
    {
      title: "Everything Worth $100+ Ships Free with Store Card Use",
      logoUrl: "https://d7olld39l2hok.cloudfront.net/images/savings/logo/4234657.png",
      offerUrl: "https://www.valpak.com"
    },
    {
      title: "Closeout Sale: Save Up to 80% on Select Items",
      logoUrl: "https://d7olld39l2hok.cloudfront.net/images/savings/logo/4216223.png",
      offerUrl: "https://www.valpak.com"
    },
    {
      title: "15% off Orders of $100 or More + Free Shipping",
      logoUrl: "https://d7olld39l2hok.cloudfront.net/images/savings/logo/4215871.png",
      offerUrl: "https://www.valpak.com"
    }
  ];

  let featuredOfferData = [
    {
      title: '50% Off Your Entire Purchase',
      description: 'Valid on orders $35 or more. Includes Free Shipping.',
      logoUrl: 'https://d7olld39l2hok.cloudfront.net/images/savings/logo/4214410.png',
      imageUrl: `${context}/img/consumer-electronics-bnr.jpg`,
      offerUrl: 'https://www.valpak.com'
    },{
      title: 'Buy 6 Donuts & Get 3 More Free',
      description: 'Limit one coupon per customer. Valid Mon - Fri before 11 a.m.',
      logoUrl: 'https://d7olld39l2hok.cloudfront.net/logo/766094.png',
      imageUrl: `${context}/img/GlazedPortlandDonuts.jpg`,
      offerUrl: 'https://www.valpak.com'
    },{
      title: 'Free 18 oz. Bag of Coffee w/ Purchase of Any Large Latte',
      description: 'Get a free 8 ounce of coffee bag with the purchase of any premium, flavoried latte.',
      logoUrl: 'https://d7olld39l2hok.cloudfront.net/logo/3868167.png',
      imageUrl: `${context}/img/coffee.jpg`,
      offerUrl: 'https://www.valpak.com'
    },
    {
      title: '50% Off Your Entire Purchase',
      description: 'Valid on orders $35 or more. Includes Free Shipping.',
      logoUrl: 'https://d7olld39l2hok.cloudfront.net/images/savings/logo/4214410.png',
      imageUrl: `${context}/img/consumer-electronics-bnr.jpg`,
      offerUrl: 'https://www.valpak.com'
    },{
      title: 'Buy 6 Donuts & Get 3 More Free',
      description: 'Limit one coupon per customer. Valid Mon - Fri before 11 a.m.',
      logoUrl: 'https://d7olld39l2hok.cloudfront.net/logo/766094.png',
      imageUrl: `${context}/img/GlazedPortlandDonuts.jpg`,
      offerUrl: 'https://www.valpak.com'
    },{
      title: 'Free 18 oz. Bag of Coffee w/ Purchase of Any Large Latte',
      description: 'Get a free 8 ounce of coffee bag with the purchase of any premium, flavoried latte.',
      logoUrl: 'https://d7olld39l2hok.cloudfront.net/logo/3868167.png',
      imageUrl: `${context}/img/coffee.jpg`,
      offerUrl: 'https://www.valpak.com'
    }
  ];

  return {

    getFeaturedOffers() {
      return featuredOfferData;
    },

    getTopAffiliateOffers() {
      return topAffiliateOfferData;
    }

  }
}