# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts Apartment::Tenant.current
puts Apartment::Tenant.current == "bufalina"

if Apartment::Tenant.current == "bufalina"
  puts "inside if -> #{Apartment::Tenant.current}"
  r = Society.create(name: "Bufalina")
  t = Template.find(1)
  template = t.structure["layouts"].select{|key, hash| key["multiPage"] == false}.first
  # puts template
  # byebug
  other_col_logo_id = template["structure"].first["elements"].first["elements"].first["elements"].first["id"]
  col_logo_id =  template["structure"].first["elements"].last["elements"].first["elements"].first["id"]
  dish_title_id = t.structure["styles"].select{|key, hash| key["name"] == "dish_title"}.first["id"]
  dish_description_id = t.structure["styles"].select{|key, hash| key["name"] == "dish_description"}.first["id"]
  dish_price_id = t.structure["styles"].select{|key, hash| key["name"] == "dish_price"}.first["id"]
  section_title_id = t.structure["styles"].select{|key, hash| key["name"] == "section_title"}.first["id"]
  section_type_beer = t.structure["section_types"].select{|key, hash| key["name"] == "Dishes & Beers"}.first["structure"]["styles"]
  section_type_wine = t.structure["section_types"].select{|key, hash| key["name"] == "Wines"}.first["structure"]["styles"]
  # byebug
  menu = Menu.where(id: 1).first
  # byebug
  if menu.nil?
    m = Menu.create({
      name:"Regular Menu",
      orientation:"portrait",
      layout:"TWO_COLUMNS",
      size:"letter",
      meta:"{\"name\":\"Regular Menu\",\"orientation\":\"portrait\",\"layout\":\"TWO_COLUMNS\",\"size\":\"letter\",\"multiPage\":\"false\",\"allows\":[\"component\"],\"accepts\":[\"text\"],\"printAt\":\"home\"}",
      sections:"[{\"id\":\"58cb2bd7-7652-4540-bf50-5baa1760130a\",\"type\":\"SECTION\",\"position\":0,\"columnId\":\""+other_col_logo_id+"\",\"accepts\":[\"img\"],\"readOnly\":true,\"styles\":{\"marginBottom\":\"1.202cm\"}},{\"id\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\",\"type\":\"SECTION\",\"position\":1,\"columnId\":\""+other_col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\",\"type\":\"SECTION\",\"position\":2,\"columnId\":\""+other_col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"41ec6865-bf36-4903-9f41-f15ed226d3e7\",\"type\":\"SECTION\",\"position\":1,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"536c134b-0196-4500-96ca-a7d8f8a4ecc8\",\"type\":\"SECTION\",\"position\":2,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"3274e679-948e-4910-8948-afa42872407c\",\"type\":\"SECTION\",\"position\":4,\"columnId\":\""+other_col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"bffae0df-961c-4017-9cdf-c8974dfedd77\",\"type\":\"SECTION\",\"position\":3,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\",\"type\":\"SECTION\",\"position\":4,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"e2c4393a-b427-488c-887a-dde4c4172236\",\"type\":\"SECTION\",\"position\":5,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\",\"type\":\"SECTION\",\"position\":6,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"3dab7395-2460-4453-a82c-5361c68569fd\",\"type\":\"SECTION\",\"position\":5,\"columnId\":\""+other_col_logo_id+"\",\"accepts\":[\"text\"]}]",
      component_styles:nil,
      subdomain:"bufalina",
      template_id:1,
      society_id:1,
      components:"[{\"sectionId\":\"58cb2bd7-7652-4540-bf50-5baa1760130a\",\"type\":\"IMAGE_ELEMENT\",\"url\":\"data:image/png;base64,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\",\"styles\":{\"height\":61,\"width\":66},\"hide\":true,\"position\":0,\"id\":\"b004c513-b05b-48e4-95d5-aa903d18cc61\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eStarters\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"209aaaaa-aeac-4b86-ad9b-ef4c36758ecd\",\"position\":0,\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003ePizza\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"e57bacc3-427a-4163-9594-0fc12a96640e\",\"position\":0,\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003emarinara\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, garlic, oregano\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e8\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"e9dc638d-adbb-4c96-a425-b47b2586fae0\",\"position\":1,\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003enuts and olives\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003emarinated castelvatrano olives, rosemary marcona, almonds, pistachios\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\\n\u003cspan\u003e\u003cbr\u003e\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"07066c63-0ec2-4d9b-a98c-fb3e898b4199\",\"position\":1,\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003emargherita\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, mozzarella, basil, parm\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":2,\"id\":\"ef0628ac-3451-4b76-b575-a8ea64291662\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eCalabrese\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, mozzarella, basil, salami, serrano, garlic\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":4,\"id\":\"226c0afe-c37d-4d54-ae66-9a6dff14d711\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eFresca\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003eprosciutto piccante, arugula, meyer lemon, mozz\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e16\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":5,\"id\":\"9772fc03-9880-484e-9eb2-a8428be9f138\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003etaleggio\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003esausage, mozzarella, scallion\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":6,\"id\":\"84cb31f8-2dd3-4630-98ba-2182c0185f90\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eSpanish chorizo\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, mozz, manchego, roasted peppers\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e15\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":7,\"id\":\"fb128007-b8b3-4636-a982-0ff5c268bb42\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eanchovy\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, black olive, chile flake, garlic, olive oil\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e15\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":8,\"id\":\"7178fd91-4054-4d87-a2d1-26cb095eb629\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ecalzone\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003esausage, roasted red peppers, ricotta, mozz\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e17\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":9,\"id\":\"d7942d93-63a3-480b-9d53-d09719d44850\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eROSÉ\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"b0f2ee17-0b44-4cf4-807a-2279c9a6b852\",\"position\":0,\"sectionId\":\"536c134b-0196-4500-96ca-a7d8f8a4ecc8\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2015 cirelli cerasuolo d'abruzzo\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003emontepulciano\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e11\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"c0d743e5-de85-4031-a9d2-effe37464aba\",\"position\":1,\"sectionId\":\"536c134b-0196-4500-96ca-a7d8f8a4ecc8\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 tenuta ripalte costa toscana rosato\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003ealeatico\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":2,\"id\":\"38bcf756-80f9-4841-aee2-efc5bcb3a4e2\",\"sectionId\":\"536c134b-0196-4500-96ca-a7d8f8a4ecc8\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eToday's mozzarella\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e8\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":2,\"id\":\"12ed4d96-5cde-4184-9465-a8a501ff41d1\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eHouse burrata\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ebroccoli rabe, balsamic, olive oil\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":3,\"id\":\"3e8017dd-0ad8-4ed9-bee2-f6f2dc1620f0\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ebibb salad\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003escarlet turnips, radish, herb crème fraîche vinaigrette\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":4,\"id\":\"ffc7db90-9f28-43d9-9ff0-9cd3ed4bd10e\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ebitter\u0026nbsp;greens salad\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003efennel, frisée, arugula, radicchio, pecorino, champagne vinaigrette\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":5,\"id\":\"bd6321d3-8316-4c20-a213-de0275a49be2\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eGnocchi arrabiata\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":6,\"id\":\"a6b4405b-0e4b-49ee-b649-2b9aeda2ca5e\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eMeat Plate\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ebiellese coppa, framani chorizo, smoking goose salame cotto, house pickles, mostarda\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":7,\"id\":\"1773c231-d924-4d72-b787-87b48a12a13b\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eCheese plate\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomme crayeuse, der scharfe maxx, ewe calf to be kidding me, marcona almonds, orange marmalade\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":8,\"id\":\"39ecd817-e24f-4a6f-8c34-e699b88278df\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003edessert\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"fd023350-ae25-4cbe-ae17-8fa0e9003d0f\",\"position\":0,\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ehorchata panna cotta\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ebutternut squash ice cream\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"510fa44c-eb00-49a4-9231-e7dfc8c32b82\",\"position\":1,\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003evanilla pudding\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ecaramelized banana, vanilla wafer, pecan praline\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":2,\"id\":\"b754b395-930a-4fc2-a42d-7a469214fd95\",\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003echocolate chip cookie\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e4\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":3,\"id\":\"9cdd6489-b847-4d39-b232-6c49019574b2\",\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env rare wine co. baltimore rainwater madeira\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003everdelho, tinta negra mole (3oz)\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"1a220a8a-68a0-4393-b09d-84c5ac36d164\",\"position\":5,\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eButternut squash\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003esage, mozz, piave\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":3,\"id\":\"9ca653b4-faa5-405d-8e40-ebde4ee07aad\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eSPARKLING\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"c597e35d-9f24-4c8d-9914-e77d369c78bd\",\"position\":0,\"sectionId\":\"41ec6865-bf36-4903-9f41-f15ed226d3e7\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env barbolini lambrusco di sorbara\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003elambrusco\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e11\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"b83ebbd8-20e3-4d57-9b98-12b9e624f249\",\"position\":1,\"sectionId\":\"41ec6865-bf36-4903-9f41-f15ed226d3e7\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env franck peillot \\\"montagnieu\\\" bugey\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003echardonnay, altesse\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":2,\"id\":\"8dc06a98-21d1-44ee-a2b1-4e7f82a37139\",\"sectionId\":\"41ec6865-bf36-4903-9f41-f15ed226d3e7\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eSherry\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"912b6d48-ff54-42ee-ae2a-8282f95fb63e\",\"position\":0,\"sectionId\":\"bffae0df-961c-4017-9cdf-c8974dfedd77\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003ewhite\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"76fb1fd2-f27f-4618-8dd0-3728c719a6e6\",\"position\":0,\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env valdespino fino \\\"inocente\\\"\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003epalomino\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"6fa4c9d7-dccb-40a2-9c4b-0c7c27a16b37\",\"position\":1,\"sectionId\":\"bffae0df-961c-4017-9cdf-c8974dfedd77\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 domaine de la patience “from the tank”\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003echardonnay\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"86ba7cd0-a0cf-45ed-92be-65acae9e3a66\",\"position\":1,\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2013 françois cazin cour cheverny\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003eromorantin\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":2,\"id\":\"c09d1ae0-e3a3-40bb-a190-dbc74b28dbc8\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 trimbach\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003epinot blanc\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e11\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":3,\"id\":\"5202b1f1-394c-49b1-9661-71483767b2d3\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2015 weiser-kunstler mosel\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003eriesling\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":4,\"id\":\"a5099ad5-15e1-4dba-9e81-341a92f46843\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 pépière \\\"les gras moutons\\\" muscadet\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003emelon de bourgogne\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":5,\"id\":\"31e1fa32-7d19-417f-b938-c5ab730f1271\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2015 lieu dit sauvignon blanc\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003esanta ynez valley\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":6,\"id\":\"8c38971b-7e56-41fe-a608-50a283ffb311\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eRed\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"55105b27-8c2f-41ff-abc8-abbef3fe57ea\",\"position\":0,\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eBEER\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"f806dec5-75fd-4ec7-985a-f3c73b0b86d8\",\"position\":0,\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 estézargues “from the tank” côtes du rhône\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003e\u0026nbsp;grenache, syrah\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"d8971a9f-7e71-4709-b579-e17c52231441\",\"position\":1,\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ePINTHOUSE\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003eelectric jellyfish ipa\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"b65e91f8-35cc-41ff-aa55-3a4e9b83008d\",\"position\":1,\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env sherman \u0026amp; hooker \\\"shebang!\\\" ninth cuvée\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003ezinfandel, grenache\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":2,\"id\":\"c08a11d4-5be5-44c5-a344-bf7dc1fc2d3f\",\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2015 jean-paul brun \\\"l'ancien\\\"\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003ebeaujolais gamay\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":3,\"id\":\"c2434329-dc60-4c0f-98c1-055559bad564\",\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e015 la clarine farm \\\"jambalaia rouge\\\"\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003emourvedre, marsanne, grenache, syrah\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":4,\"id\":\"bbafad8f-f906-408d-8475-7a5ea2f1228d\",\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2013 sandhi santa rita hills\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003ePINOT NOIR\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e16\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":5,\"id\":\"84c5c7d6-c1d8-4ef3-b2f1-e75cbab2979e\",\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003erabbit hole brewing\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e\u003cstrong\u003eoff with your red ipa\u003c/strong\u003e\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":2,\"id\":\"dfd28cfb-7f80-4d2f-87ba-8a5ff949c4ed\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eLIVE OAK\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ehefeweizen\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":3,\"id\":\"8dfbbb05-f161-43ab-92c7-0b17f0cbd96d\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eBLUE OWL\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003evan dayum! sour red ale\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":4,\"id\":\"b7572d82-433b-47ad-bb44-bec1c5214349\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eSTRANGE LAND\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003eaustinite pilz\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":5,\"id\":\"71b899e2-f114-4558-b4fb-18cde1efe244\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eLONE STAR\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e12 OZ.\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e3\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":6,\"id\":\"105f680b-62bf-461d-a72e-8aab3871c96e\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eARGUS CIDERY\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003eciderkin 12 oz\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":7,\"id\":\"ac5f9f99-7cec-4c8a-b285-51127b0c0e0f\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eJESTER KING\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ecommercial suicide mild farmhouse ale\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":8,\"id\":\"a25688ba-2aa5-4e09-a7c2-ea7902848170\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eOther drinks\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"31f8958f-2296-4f5b-89c9-b410d42d5ba3\",\"position\":0,\"sectionId\":\"3dab7395-2460-4453-a82c-5361c68569fd\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003e\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003emexican coke, diet coke, topo chico, san pellegrino lemon or orange\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e3\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"cd5cefa5-a918-406b-bebb-32d255451e8e\",\"position\":1,\"sectionId\":\"3dab7395-2460-4453-a82c-5361c68569fd\"}]"
    })

    Menu.create({
      name:"Dinner Chavez",
      orientation:"portrait",
      layout:"TWO_COLUMNS",
      size:"letter",
      meta:"{\"name\":\"Dinner Chavez\",\"orientation\":\"portrait\",\"layout\":\"TWO_COLUMNS\",\"size\":\"letter\",\"multiPage\":\"false\",\"allows\":[\"component\"],\"accepts\":[\"text\"],\"printAt\":\"home\"}" ,
      sections: "[{\"id\":\"b42b466d-effe-4461-8650-2603099ef348\",\"type\":\"SECTION\",\"position\":0,\"columnId\":\""+other_col_logo_id+"\",\"accepts\":[\"img\"],\"readOnly\":true,\"styles\":{\"marginBottom\":\"1.202cm\"}},{\"id\":\"96fdea84-0764-4f46-ae25-16f7919a79f6\",\"type\":\"SECTION\",\"position\":1,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"b0e6098b-70dc-4ac5-9d1d-99446e743670\",\"type\":\"SECTION\",\"position\":2,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"c0a896df-fba1-47d7-87de-8d406b9775ab\",\"type\":\"SECTION\",\"position\":3,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\",\"type\":\"SECTION\",\"position\":4,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\",\"type\":\"SECTION\",\"position\":5,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"353f6860-4b0e-438c-8209-f070bd8413c6\",\"type\":\"SECTION\",\"position\":6,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"936d3d1f-bd6b-420f-9b5b-534ee02f1c07\",\"type\":\"SECTION\",\"position\":7,\"columnId\":\""+col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\",\"type\":\"SECTION\",\"position\":2,\"columnId\":\""+other_col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\",\"type\":\"SECTION\",\"position\":3,\"columnId\":\""+other_col_logo_id+"\",\"accepts\":[\"text\"]},{\"id\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\",\"type\":\"SECTION\",\"position\":4,\"columnId\":\""+other_col_logo_id+"\",\"accepts\":[\"text\"]}]",
      component_styles:nil,
      subdomain:"bufalina",
      template_id:1,
      society_id:1,
      components: "[{\"sectionId\":\"b42b466d-effe-4461-8650-2603099ef348\",\"type\":\"IMAGE_ELEMENT\",\"url\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABfCAYAAAD1aNk5AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAABZLSURBVHic7Z15dBRVusB/t6p6S4AkJOwh6SSdoAbEgRGfuKGioI6C6HNf5iHujqOCyCiC4jCOCDhz3iguxwXc37igCKLiMoQRXEAUEEhCZ0PCErKSpJequu+PTjppurMAWXDo3zk5J1V1l6/6u+t3v3tL8OtBuFJSTpBCpAgYCIqQEgdCThKCf2FygRToCCxIuU2iVAspNVMVLxUUFHwPmACuQa7k/F/yd3bzu7QL0d0CtIbL5epl+swzhTCvBcYD8Q2PJIcmux+oBnSgH8jNwFIp1U8c9Y6NW/ZtOdChgncQR5VyspKTB5mKZTSKHCklVwG9gITOzVXqCPEeUmzSMV8sKioq7dz82k+3Ksflctl0XU/QpJwsEdcAWYClG0XaDWKLgN0S8yW/lD8UFxdXdJcwXa6cjOQMF6r+gETxCuTFQBIQ09VytJMtSPF3e8+YxVu2bPF1deZdppwMp3OiNBkuhJwGokdX5dtB7MZUz9tRsmNzV2ba2coRrtTUyRJxL5DdyXl1NsUgrzaEcBcWFu7uigw7TTkul6uX9OsvA5M6K49uohLBZ6YQ8wsKCr7tzIw6WjlqRopzKjAFwSCO3r6kI/AJwVPSpFxI4938kpIdHZ1BhyknIyOjL7rxNjCmo9L8FeEB+ZpU1cfcbndxRyXaIcpJG5x2hqLIN4FBHZHerxZJniaNMdtLSnZ1RHJHpJzjBg1K1C2WW6SUc0BoHSHQrx0JBVIRFxQUFGw/0rQOWzmulLTrpJALgT5HKsR/IH4pWGnCFYWFhZ7DTeRwlKNkpDinIXgcUA4342MDuUqq6uVut7vqcGIfsnIynM4bkbxyOJkdm8h8Q4iLCwsLtx1qTLW9AceApqamPgHiCY4yg+nRjeitwKUJ8XHbKqqq8g4pZnsDulJSsqVQutR88R+GIaUy3l3sXtXeCO3qM5xOZ7wU4pXDFisKgCqEuTw9NfXC9kZoUzljQFNN3gLx2yMSLQqAVSA+zEjOcLUncJvK2ZnifBLBuCOXK0oDKqrxZHsCttrnuNLSzpem/ACwd4hYURoxDcGgtqzbLdactLS0IdKUi4kqpjNQVMlC2qgcEYfSLperjzDMdcCAzpAsCgDDescn1FZUVX7dUoCINcf06dcQVUynI5AzXE5ni/15pGolMlKdFUBc54kVpQEJ7PVL8/hIjiRhNSfD6ZxAVDFdhQCSVFVNifQwpM9JTk7urQnlfZqc96J0PoqQjEqMSygtr6rMDXnQ/MKuaVlAapeKFgVghCnkQy6XK2T5JUQ5UkatAN2GxGv6/Rc3v3VQnyMv6kp5ojQhBKcKOLX5vaByMjIyBgPndblUURqxgBg7cuTIoDtyUDnSL1M5hPWdKJ1CbXVZWdAoGlSOIoxR3SNPlCZkqgEnNF4pAE6n0y6luK37hIoSQPQQ8CwNxgEFwGYYvRFkdqtcURoQSZlO5yhoUI6hqrd2r0BRmiOFiIMG5UgZHaV1Bq7MTAYOHBi8znA1LYAmJSXRo0fknTBSBqY0WnZ2ttVz4MDgtnw97p06lcTExOB1bI9YNFVDSsnevXspKChg86ZN/PTjj0gpQ+JeefVV/DtnDTt3hu6Tvf7GG1i3dh15uQGrxd33/JGsIUOwWm3YbDYURdCzZ88wWXr27IWiCFQt4GQ6/rzzMA2TZ557lulTp1FWVsaEiRO59fbbcTgCy1EPPzSTNTk5OJ1O7vjDXTww7f4wOVti3PjxlJWVsf7770PuCyFYvnIlN0+ezC+//BIW79JJk/jqyy/ZtWsXFouFf773LiNOHA7A5ClT+GHDBj779NPwDKUsBtC8Xm8ciOS2BJw46VLy8/LYtjXgfrVnz27sdgdCCAYOGsgJ2Scw408zcLvdzJr5MD9u3BiMe90NN+Dz+cKUc8GFF1JfVx9UznnjxlHoLuCLzyM7qJimie7X8Xq9mNKkvq6eivJy6mrriImN4cyzziIlNZWysjK2bv2ZdWvXMv7CC3js0UfZvGkTAIZpMumyy3Dn7+DZRYvaem0ALvzdRfz0409hyhkwYABZQ7L4zYgREZXjTHOif6YDkJCQwL69e4PPMjIyWLF8ecT8pBAGgGbq+tj2+EdVV1Xx1Zdf8uriJS2GiYuL46abp/DG22/xhzvv5ItVnwNwoKYG0zDDwtvtDmz2poVW0zDIyVnN/731djskCqW+rh4AraE25W7PZc2aHE4/8ww+Xr4iGM7r9QJw79T7WLFiBcVFRW2mbbPZ0LTwKeCIkSMBOO2M0/lo2bKw51JKfL7AbsW4+HhKS5tWpXvF9WLfvn0R8xNQD6AoUl7TpnSAz+/HYrG2GqaqqoqF8xdw2823MG/+fOLiAisPiqJgtUaO66mvD7lu/JHDBBaCuLg44uLiiI+PJ8PlYuiwYaSnpwOBH0LX9ZCmytAN/D5/SDp+f+DHKi4p4Yknn0RV255367oeVHpzMrOy0HWdk046KWI8q9WGqgamkpqqhii4b99+1NRUR85QikwATbZzP40iFEzTaE9QclavJj8vnzFnn80HS5eiqipqhJJntVlDfkzdMLhv2lRuuf02EuITcMQ4gs9iY2PDfiBd19ldWso5Z43BNE1qa2uxWps2YyuKgsUaujnbZrMB8Kfp03nmuee4+dZbefaZZ1p9H6vVhhDh7cvQYUNZ/a/VnH3O2fTs2ZOampqQ5717J1BdFVBA3379KN3VtIteCMIKTiNSyCwADUQR7div6fF42t2BAuzds4f+A/oD4PP5qK4OLyV+nx9FabK9xsbEsPT9peTmbsdT76GqqoqysjKklFRXBXzBfX4/VouFuro6/P7Ql5OmSVx801KUz+cNk9luCzSjW3/eyp233c6LL7/MiuXLW23eLBYNXQ8vmEOGHMfsWQ8z8rcjOSE7m2/WrQt57nDEMPevj1NRUUG/fv2x2+28+8FSBgwYgEWzYBiRC7ti0g9AQ5KDaFs5QghiYmLbChYk1ZnKmjU5APh8fjyeyDshLJamkm2z2Vj//XesyVkTMawrM5P8vDwiN3yBQtBcGTZbeImPbRi+erwevvv2W1au/JiHZ8/ilpumtFj4vF4vPXqEvnt8fDz9+vejYIebvNw8hhw3JEw5F40fH/xfURRMs6nftVqtIdfNkYKTnU5nfw0h1fa4TKuqgmHobYaDwEjkuOOPJ+dfq4GAYnv2CB8SG4aOzW4LXtfXe0IGCM1JTk5m+cqPueSii9i+LfK+JKvVijSbfmChKGFD8cam0Wq1Ua/XMXfOY3zy+SquuOpK3n7zrYjpGoYR1mdmZmXh9/vZuXMnubnbcWWGG1iuvf56zjrrLMorytH9OhUV5VRVVbH1559Z+/XaiHk1iq5Kma7RTmd2IQSKaNu1+vQzTmf2nDm8ungJpaWBNlZKid0R/qMLRQk2MwCKIpAtlKYx55yDqqpcfsUVzJ3zWEtC4vN5g5f1dfVhNUfXdfx+f3AgUlVVxYMzZjB/4ULWrM6JOCSuqakJU87gwYMpLCjE5/Ox6adNXHX1VWHxPvvkEzZ8/z0HamuxWq3Ex8djs9mYOOlSzj7nXP48Z07k9wCkFCdrUop9Efq6MGw2GydkZ3PVNVdTX1dPdXU1uq7Tp08fesX1YtCgQZw8ahTp6Rk8/Y//5flnnzvodwvPRFWUQM/YgMViDQ49D+bcsefy3bffctnll/O3BQupra0NC3Ogpiak6fX7fWGjwUijui9Wfc5nn37K088u4r8nXRbWl0WSv0/fPuzIzwdg+7atZGZmIYQISXfv3r3sbTa3aWTD+vV8sPyjiO/ZlB+XaIqQB2Q7Kk9sbCz/NfpUhp04DI/HE5wvAMTExpKSkoKqqrzw3PMsfvmVECGFEPTq1SssTY/HS319XfA6MC8I/2EcDgcnjxrFpAkT+MeiRZw7diwffvBBWDiv1xscjTVPszmapkbsiGc9NJMPPlrG/Q9M5y9/nhsaR9WQB6Xbt28/9uzZA8CWzVtQNZVBycnsLCkJS7sRVVMZNCiZm26ewqcrV7YYroF0DankIdoehRmmyfx581qcICYlJXHBRRdyx113MeqUUdxy0xTKy8sDcQ0dI8IkVEqTutpmykFGrBEXT7iEAreb3O25LH3vfa657rqIytF1A1M25eNwhB+D4Pf5cUTo17xeL4/Mms3iV5fw5RdfsvbrJkdMVVNR1NAm/cThJ/LuO+80vJ/Bls2bGTpsaIhyrrz6Kk4dPRqn04lmseCpr0dKyfvvvsdbb74ZJsNBbNAQ5s72dDt+n5/KisoWn5eVlfHq4iUs++BDXlq8mDlz/8xdt98BgKKomBFKq2EYIaXYNE369Anf/3vl1Vfz5utvALByxQrumzaVrCFZ5G4P8STC6/WGTGJN0wwbJfr8fhRVxWKxhDVf69au5aNlH/HInEf53QUXBp/b7faQQgSQkpqKqqi4MjOxWq1UV1eTnBxqBVu+7CM+/2wV5eXlLY7MWkakKorf1q6tcKqmhsxJWqKyspIH7r+f88eNY3BKwFdOSjNiX2IYZtB4CeD1eIiJDS3tw4cPJysrK1hT3G43G9av56qrww0bVps1ZOJqGEZYX2E23EtIiHyM26OzZ2OxWJjx4IPBe36fP2SgERMbQ2JiIo88Noe33/knb7z9FqeccgrZQ4eGpHXgwAHiExJ4+tlFfPzpJyx5/TUWPf8cY84+O2Leocgemq7qzvYM12xWa7snoXm5ueTn5TPsxGGUFBezZ88erAe12RBo7izNlLNv3z5iDmqKzhk7lgMHDjD3r4+jCIXaulocDgeXTLiEBU8+GdIM6n5/qMVB94f1QfWeQM2yOxxEorq6mlkzH+aFl15k2YcfsvGHH9ANPWT2n52dzZ7duznztNODNf/U0aOZNv3+kLQsFgvz5s9n9sMz2fRTwPCanp7OX554Ao/Hw7q1rQ6nDQWJt7UQwZeqr29xIhmJysoKYmMbJnz19SQm9g4LU3ugNqSP8Pl8ISVdURQuu/xyvvriC37Z+Qtbt26lwO3mo2XL0A2Dcc0meQCqqqL7A3Ox2NhY7HYHmsVCcnJy0HzU2OxZItjKGlmTk8PLL77EvAXzsVqteOpD3zt76FA2b9oc0iSXFBeHrNcA/M9Nk1n09NNBxUCg5v9t4UIenPlQi/kHkLs090735oxUZx1tHCIkJWiW9h3SkZSUxPCTTuLR2bMB2F26mzPHnBUWrmevniH2JcMw6BXX5KZ92umno2oqMx98KGyENWDAAG74/Y289+67wXvNbW9/vPceJk+ZAsBXa3KYdt99LH3vfWpqapBStlnQ5s+bx/CThnPv1KmYpolo1qQPOe448vJC+7s9e/bgcDhITExk//79QGBx7eApBcC333yD05kWNvQORcQqBDzdv2pVUgJ2qpYsyyFJCsHDj8xm4w8/BGfyq1at4jcjRoTMooUQDBgwgIqK8uA9RVGwN7MYTJx0KR8tWxZx6PvOP99h6LBhYaU1tsHM8tSChYwcflLwb+l77wMNa0K63ua7mKbJgzNmcO111zHytyPR1CbFO51pYVYKv9/P/v37Sc/ICN5LSkqKmLamaQgRee7XiICtgWVqRJuHjtrtdmJbsa2pqsqoU07huRdeYPjw4dx9513BZ/l5ebz4wgu8smQJp44ejaZp3HbHHcTG9iBndU6TQEIQ39BR9+nTh/PPP5+VKz6OmN/mTZv4ceNGJkycELxntdqCVoz6+nqqqqqCf83x+/zYWzATNaeosIh5TzxBZlZWsNWw2+0MO3EYG5stJjZSumsXmQ0FMC4uLuIqLkDfvn1D5okREZRoAArmixJxU2theycmcvNtt/K7Sy5B1wMvZ7PZsFgsOBwOBqekUFNTw8oVK5gxfXpwjtPIUwsW4nDE8MqrS1BVlcqKCu65++6Q4ayqaqhKoG8Yf+EFlO7ezYb161uU6a033uRPMx/iqQULAyYiu417p03l2huuR2+Wrq7r/P2pv5GzenWgdjrswRrWFm++8TqXXjYpqPS09HT8fj8lxeEnd23buo20jMD6kqIq2Gw24uPj6dmrFzExDqSUGIZJQkI8MbGxrQ+wTPFzY71SMlKdm4HjWwo74dKJ9O/fH1XVMIzAUrHH46GyspL9ZfspLChocWWvOf3692fgwIFs27aN+rq6sGfehjSTkpLQLBq7S1ve06ppGikpKbjdbgBOP+MMevYKlFYhBKZhIqXEYrHw7TffBE0pWUOyKCosarv0NmC32xGKEpS3eb/SHFUN2JCNhuWFJa+/RmlpKT6fj31792Kz2ZFI4uLi8Hq8PD53bovLBqYimkbRGalpc0E+GDFklK6mcEdRYUbTEETInFYCR+lChGQpYAaVs6Ow8BMBP3ajTFEakArbIHR/jkTQpqk0SucjwQcH72wzzXD/nihdioDyhMTE1+Ag5ewoLl4HdMjhoVEODyl4Z/369X4I3+puAOGzqyhdh5TBBbOwNQAhzekElBSly5E6EDT6hXn6lVdV7UuIi/cKwdgulSsKAvHWjqKivzdeR1w9cxcXzgNaXWyI0uH4DFM82/xGS0ubUkjRuo9qlI5F8lJBSUGIIaBFL+7yqsqfesfHJYMY0fmSHdtIKPDovok1NTUhTg2tOgVIU31eQrg7TJQORZFi1q5du+rC7rcWyV3i/g4I94qL0nFI8nwYEXdRtelOI5DvdLxEURqQJuLOlj7a16ZyBhcVPQisaytclEPGQDC5oLjgs5YCtKmcr0AXyDtpMMZF6SCkuHdHYeErrQVp14ns+UVFGxDc3SFCRQEoFVJf0Vagdh9EVFFZuT4xPs4P4twjk+uYZ79UlTN2FBXltxXwkE6JKq+qyumdEB8DnHbYoh3jCClu21FY8GV7wh7yx4mEps0VcMjfgomCBPGH/OKC19sb4bC+g5OWlpaqmPILIP1w4h+DGAJ5a35R0YuHEumwP1KU6XSeZEr+DWhA266gxyxys5TyHndx8eeHGvOIviA1ZPDggT6hZStCLqd7v8Z+VCLhG1TlisP9dugRHRu5v7q6prKq0p0Yn1AKXHIkaf2nIeAle13sNbm/5LbtadlyGh1DhtM5HskCmh2DeIxSjWD6jsLCF4BD3c4WQod+GC89OT1TqOYmIHyn1LHBlwjm7Sgs7BAXsw49DbeiuqI8MT6uDsSx9qUqQ0rucxcX3lFRWdnm5LK9dPhRxeVVVd/0TogfAIzs6LSPQqRELBKGep27pCDyXpUjoLO+9ykyUp3vAJM6Kf1uROrAKwjxvTSUDQ1rXp1CZ33sW9rrYm/0xNbqSK7opDy6Gj+Cj02hzCooKOgSn/JO/1JuZmrq8SZiPnBBV+TXCUjgY800bt5eUtKl3rBd9mO5UtIulkI+CQzpqjwPEx/gAZEDbBPSeDm/uHhLdwjS5SXZlZKSLVHuQnA+MJCj42uKfiQvCoVcaZqrdxQXt7zXsQvp1mbGNciVjKrfaQrRE+TvBbT/tL0jQupCig0mrEChWNG0d/Pz81s4cLP7OJr6ADEkNdWpC/FHIE2YuKUgFTiHw/+GXKUAUyLWCsyvpaa9qum6tr2oqJhfgT/40aSciJzYr1/sAbt9nJBKDyHMnlKITCFlhhSiHxIbkARUAnsIvI8NKDRNsah3397rGrdT/Br5fw2znBL4hF7pAAAAAElFTkSuQmCC\",\"styles\":{\"height\":61,\"width\":66},\"hide\":true,\"position\":0,\"id\":\"9c9b3e62-4927-41da-8345-d9241dd922b0\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>Sparkling</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"fbb77b55-45aa-4dba-bf5a-41a9a1cb37c8\",\"position\":0,\"sectionId\":\"96fdea84-0764-4f46-ae25-16f7919a79f6\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>RED</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"7339daa5-6e65-4e89-9954-5d5834f657bb\",\"position\":0,\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>SHERRY</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":0,\"id\":\"59ed1e24-735c-48b9-97da-2be612222a39\",\"sectionId\":\"c0a896df-fba1-47d7-87de-8d406b9775ab\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>WHITE</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":0,\"id\":\"e4770e79-a6f4-4c80-8177-28e6bc3adf6d\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>ROSÉ</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":1,\"id\":\"f3bf7472-03a4-46dc-998f-2677dbc9da06\",\"sectionId\":\"b0e6098b-70dc-4ac5-9d1d-99446e743670\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>BEER</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":0,\"id\":\"a7a04586-2d7f-40ab-ab25-6e57f9ba25c3\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>OTHER DRINKS</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":1,\"id\":\"e8d5cbb9-41e6-4e22-adc1-05afdfd02e97\",\"sectionId\":\"936d3d1f-bd6b-420f-9b5b-534ee02f1c07\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>STARTERS</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"b67e671c-f5cc-4816-8be5-c5d23ff9e89e\",\"position\":0,\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>PIZZA</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"1d660f05-8296-437c-8004-bdd5a8eb4460\",\"position\":0,\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>DESSERT</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"81415c30-de08-4213-832f-21699872a827\",\"position\":0,\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>horchata panna cotta</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>butternut squash ice cream</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"id\":\"616611bc-4e0d-4895-b688-11f28ed2ae52\",\"position\":1,\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>vanilla pudding</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- caramelized banana, vanilla wafer, pecan praline</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":2,\"id\":\"01dd3991-0439-4416-98d9-22dad1656f22\",\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>nv rare wine co.</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>. baltimore rainwater madeira verdelho, tinta negra mole (3oz)</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":4,\"id\":\"38045844-cb01-46b0-9f85-75df7dc70f2f\",\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>chocolate chip cookie</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>4</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"977d6b8e-0aef-444e-8c90-4fae83bd8ae4\",\"id\":\"9aac396c-691d-422c-a668-b1b611189ac0\",\"position\":3,\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>marinara</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- tomato, garlic, oregano</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>8</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"id\":\"074a61e2-a0f2-4714-a761-019bbe00952e\",\"position\":1,\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>margherita</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- tomato, mozzarella, basil, parm</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":2,\"id\":\"675bfb52-7bf0-416f-b234-ab876c2b1830\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>calabrese</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomato, mozzarella, basil, salami, serrano, garlic</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":3,\"id\":\"a12456cb-9b07-43be-a318-b119d2b81068\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>fresca</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>prosciutto piccante, arugula, meyer lemon, mozz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>16</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":4,\"id\":\"690d7a8d-4bf9-4cb7-941e-13785d6d81f0\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>taleggio</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>sausage, mozzarella, scallion</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":5,\"id\":\"e69f8e56-6090-4227-aa3a-407318c430d2\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>spanish chorizo</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomato, mozz, manchego, roasted peppers</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>15</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":6,\"id\":\"8130093b-9a84-4afb-b7b5-f620475e539f\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>anchovy</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomato, black olive, chile flake, garlic, olive oil</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>15</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":7,\"id\":\"861b74bc-10ed-4f2d-b113-04905a9b7bf3\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>calzone</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomato, basil, onion, sausage, roasted red peppers, ricotta, parm, mozz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>17</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":8,\"id\":\"574ed53d-8d20-4bc5-be73-1f2b6d5c64f0\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>nuts and olives</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>marinated castelvatrano olives, rosemary marcona, almonds, pistachios</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"id\":\"8c2b6876-76b4-4f75-8cef-6343e421db13\",\"position\":1,\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>house burrata</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>broccoli rabe, balsamic, olive oil</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":3,\"id\":\"bc1d6bec-d4ac-4ec9-9ab4-35eecf69b9d7\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>bibb salad</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>scarlet turnips, radish, herb crème fraîche dressing</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":4,\"id\":\"e51e9ce5-ab89-48ad-a27f-cd9fe7d34589\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>bitter greens salad</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>fennel, frisée, arugula, radicchio, pecorino, champagne vinaigrette</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":5,\"id\":\"f19fa3d2-c89b-476a-b578-b04c9dd3f2f0\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>meat plate</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>biellese coppa, framani chorizo, smoking goose salame cotto, house pickles, mostarda</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":6,\"id\":\"0aa20ee7-34b5-4660-a93c-57514d0c1959\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>cheese plate</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomme crayeuse, der scharfe maxx, ewe calf to be kidding me, marcona almonds, orange marmalade</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":7,\"id\":\"2584bafd-aeb8-442e-bef2-d4a1799e387f\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>today's mozzarella</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>8</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"977d6b8e-0aef-444e-8c90-4fae83bd8ae4\",\"id\":\"9ae35f2c-99ff-4966-af11-096506775c9d\",\"position\":2,\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>nv barbolini lambrusco di sorbara</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>lambrusco</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>11</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"684cef96-7975-47bd-9a9c-3ad0e8749b76\",\"position\":1,\"sectionId\":\"96fdea84-0764-4f46-ae25-16f7919a79f6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>nv franck peillot \\\"montagnieu\\\" bugey</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>chardonnay, altesse</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":2,\"id\":\"bbe757a2-095f-4651-b750-8214c83c45e6\",\"sectionId\":\"96fdea84-0764-4f46-ae25-16f7919a79f6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 cirelli cerasuolo d'abruzzo</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>montepulciano</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>11</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"3c08fe95-03b9-41de-9bdf-aedf63e3e30f\",\"position\":2,\"sectionId\":\"b0e6098b-70dc-4ac5-9d1d-99446e743670\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>nv valdespino fino \\\"inocente\\\"</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>palomino</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"4d24ec18-76c1-426e-8dcd-40843d353c90\",\"position\":1,\"sectionId\":\"c0a896df-fba1-47d7-87de-8d406b9775ab\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 domaine de la patience “from the tank</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>chardonnay</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"6d4fe380-c0f5-4058-a3ee-74a20f90d939\",\"position\":1,\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2013 françois cazin cour cheverny</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>romorantin</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":2,\"id\":\"23f8b744-e78f-4295-9d1b-ba8ebd08c684\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 trimbach</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>pinot blanc</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>11</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":3,\"id\":\"ca1d9366-df1b-4594-a1d5-a49e264232aa\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 müller-grossman \\\"steiner point\\\"kremstal</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>riesling</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":4,\"id\":\"b9fec733-3aed-4798-af36-233f89313c8a\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 pépière \\\"les gras moutons\\\" muscadet</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>melon de bourgogne</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":5,\"id\":\"bbb71069-f789-469e-8f9b-ffdfd9f08cc6\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 lieu dit santa ynez valley</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>sauvignon blanc</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":6,\"id\":\"2ad59aa0-da81-47f2-af0c-75bca972627b\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 estézargues “from the tank” côtes du rhône</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>grenache, syrah</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"255fd061-4ce1-4d20-8719-b3832967c454\",\"position\":1,\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>nv sherman &amp; hooker \\\"shebang!\\\" ninth cuvée</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>zinfandel, grenache</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":2,\"id\":\"dde2660d-e3f1-4535-a0a5-d24acccb747d\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 montesecondo rosso toscana</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>sangiovese</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":3,\"id\":\"a4f7d575-b90d-4443-b14f-2a9d4e186e4c\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 jean-paul brun \\\"l'ancien\\\" beaujolais</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>gamay</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":4,\"id\":\"901b4fef-3caf-4ac2-bdcc-14c7c3332e2c\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 la clarine farm “jambalaia rouge\\\"</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>mourvedre, marsanne, grenache, syrah</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":5,\"id\":\"62ee6ba1-cb0c-48b1-9c36-c99e8ddd06ec\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 tyler santa barbara county</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>pinot noir</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>16</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":6,\"id\":\"14984fde-bbd3-454c-8810-ce98a4ccc36d\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>pinthouse</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- electric jellyfish ipa</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"id\":\"ff5ce71e-71cc-47af-858e-d731709641ae\",\"position\":1,\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>rabbit hole brewing</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- off with your red ipa</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":2,\"id\":\"f9201d06-b6b7-4cc6-b42f-bc4aa53f92bd\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>live oak</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- hefeweizen</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":3,\"id\":\"766813eb-5137-4d55-860c-31d59ddab11b\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>austin beerworks</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>blackthunder german-style schwarz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":4,\"id\":\"9c496e47-58a0-484d-83b9-98672aef7cfb\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>blue owL</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>van dayum sour red ale</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":5,\"id\":\"8c8a4004-1696-4a1e-94b2-dd0c67c9b905\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>strange land</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>austinite pilz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":6,\"id\":\"220881a6-961c-4e9f-837f-a81e103e9b6a\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>lone star</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>12 oz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>3</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":7,\"id\":\"b54bd23c-1396-4e0c-902f-021985af7c48\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>argus cidery</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>ciderkin 12oz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":8,\"id\":\"7879b933-05e8-430f-b769-f05d6ca423ff\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>jester king</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>commercial suicide mild farmhouse ale</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":9,\"id\":\"bbc98e31-c96c-49ef-a9f6-6aa2bf62f4e6\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>mexican coke, diet coke, topo chico, san pellegrino lemon or orange</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>3</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"1174e969-11af-4a34-b39d-f295b58562e0\",\"id\":\"db5793bb-c1bf-4fac-b2ea-84c557173320\",\"position\":2,\"sectionId\":\"936d3d1f-bd6b-420f-9b5b-534ee02f1c07\"}]"
    })
  end
end

wine_separator_big = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA5wAAAACCAYAAAA0NtN/AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAstSURBVFiF7ZnLkx1FdsZ/38mq++iXEC0QIyFGjAcPYXlHzMYLh/BfLkd45RALR+CJwMAgBpkRMHp239v3UXk+L7Jud0sICMJLOyNuVGVWZVbmeXznO+fqxo0be/P5/LjW+sNXX321ApBUfv/e7/9Aqf/oyhWHOyU9cm+pl9UBsrwNe2PHlvDGsInUFtgYZij/KFQSWWQiJWCbZDcGlpQktpRcGsscn8FuvjPJ146BkVJkpuT2HLNrqYv71l7qS7zyPF/q5+X39fJaenUtuApcyWQiuUeayPSJzkI+tXVq+TRSpxk+iOS9136n6eJy/+f2+HPzXnqesArrbyYfN9nrEOWRiT1gBjkFZiYi5K3tDcT2JX3DSvAs0dNQfYK9qqX0UesBEbeUo42EwxBhhx3Bq30sg4RSykwpBUnKEplkjntMgVPNjgSpVKYu7EVVmVKimhrHaipF3dmM5DhGecvwG6T+JQGZFF5IWgIrW0Vyb6uD7GX1lnrIqaX/FjyVvZ/WQRO5EvOM8Mm44DHwjoloNpI+14PU7DNxtr2Ozy7e2Y1lYl55R5fWyXGd0Qd++R1khHXpWzufCWvArB3e4ObTuKxL8cb2BntdI5aSziRZ2+1RSn8Ix36GO6U6KZvMRtlJ6iV3tnrI3qgT7rE6CSc7fx33s/PfxKm238vyk1UJXpz7/YXR7+4v2X7zkde9d+5riRV83c5XIiKL7ZCjAJHhwq4fDtnFjnC4hB2jfldJLuXorOzk6KTs2vl9cQVZqgHCzfYhBMi22lZBUpVcnVTkaqkqVaWsliqptLLufMPKipSRqkCmmt8o1TX8Vv+qfiR36XPdFIKNknzJhqT8Cdu5wFnr0HAbmAYOm0AOEWEciCZPFEAgQna49bXDEuOHJo6FryI6wNjPgeeSFk6WSEuTS0kLpZaENzud1jr6DTIMl32Inf+k/WY49l+HI4JzrNnhCi4bqaZdIorDbj9cAtWJGoaIX9E86h5QOMIgovUNCjsgZHmbqW+VepRdnpRSajd0nX2mjHg77Rsi7kC+B0yRpiRThDHrhlFZGW2s2Zol0eTu3TcjAsviRPDocgwKO9I6CJh7jLs0TP5RLM4xjr92bMR3wCPGmxwx/5wD/AjjrdQ4p+kHyW7OFw4XQzD2Ez2Vai9HD0xSOUGaKNWjnAhsxwnUP5H9d47tbyPiIO0DSQfYB3J87x1+X2qqynbDtMk6pzuZZzIBppKmwNTN7AasreTB9tbWEPJ2XG6WxO8grwgeMQohAmwV2QV5O/Kliz3kq/EfLJ9CPBc8wzyr8FzoTJHXDO8EzIGZ7Tkw38W8y2tdYOxo82NsGvX7UlySZMwt07BM0hPb/4o0xZ4HzNI+iuhmtjvkt2TfSGsS8IblaDo8x+7xJyOnE49cbDeeIw45z2McZ5hnkg5tH7zWyUQKPbE9EBdYG4R2nAOzw5/mlhffvRQvzmPFSvIp1kLkoiZrgnVxPAM2o01MLHWyasr1/HzZ5LnjQkr1UvZIE1vdjlcBaxwbh7dOfqvgn9jp6Zyf+sTWFyE/TqmXvW9pUShnlRrAqnN5RPFJ1lptB9IR9rtRyhsAWf1CaAmcJVpJtSIdqbJSp6WznGbNU0mOUru092zvlYgTYK3MFwyzF/3V/sWnn366Abh58+bedDo9LMNwoFKuVfsYlyjmsJZ8h+QtBcXJQujBlPLJpvKcOWtgPZ1OV4vFIh48eJAfffSRHz9+vF8y/850c6lOQnqysb97/+v3f7jHvXrnzp3+u+++m761v3/goRwClBJd7f3GFr6R9HzvZK8uD5fD559/vn6tjQC3bt2aAzx8+HAFBOB33333jclkchw1Dl39QjM9tz0rpfTL5fKvs9msL9vt8baUJ19++eXzn1obWi51l7u6xz1u3rx5ZQ7zlbS8fv36yf3797cf6+PuL7/7yz5ARKy++OKLzV3ulnvcs+36M+vq9u3b04iYzufzul6vt8vlslzdXo2zw7MyDEPMhlmp8xq11pgMQ9n2fXe4XP7tPx49Wry63sf6uHtw+0HXdZ1/Tl7/2yb7Rxj2Uvvggw+mZbu9Mdg35HLs4hgDFTAGz3EtgHC81N9dHeOc1BXE0S4YjSSqBabmoBpJnLDDoAiiAUbEuOcgdu+hlr+4vbd7Tsgto5HH+dCCe5CPU3qq1DASNYdVLBfZXVpdyMVWp6CM5KxckEcXNaAoQp3F1slC8gKY2lpEELYODFdEHgmVC/BqRE5msBhsDZfBnh3o/QTh/qVkRZfW+MlkRTL2Olty9esNJ9U7POxkKMdg5RAwN3FD9l7CivGnYEXqTLDCrOhYZVUGfiOVicvGeF3CG9tbw4cBb+z0ex4wzm3hQu+MAV5wltJZpE4T/dXF35daBxoRmI3XKVVTxAyYNgKRU8MMYk/2HvEKgRxB31IVuTSxsb0NeUgpW/KsgpSSe2hrZzJRUBrRUYWstgbJdQyWe8BMaB80NecJhzCPfK4bj0kIMdpgL9NZdOO1x3SIQmJENsdzn9ZEjbyvBF8bPWkkSFXy4KRKHtK6NiYew/h8iPGqoOxIVYjrhvnlgJyXbWq0N0tLyadq81raYe+1udpr+9NZwkr2lmCDtZW9BWaWD5pOmAXMjAIxyNpaTsyh4argqNm1E5SGRkxxykqLCkranAQSlC33oOJGHHgNmfsVbYa4AhwhepI/Szw2XpgoInusCfLNEZeqRBWutiqigt8G7dF02ezUBGJDK+Ctw2wsb0AbYDPufSNrY7mSTAEI1jKDzdbSEPbW8tASwFxAFBom7RsPJraSt9hbE3uB9ZoiQLppt/mzdCZ5yORIwR6N0M5GPGwJpjTFHNjsS9pHTttfyzpt+vYGYj2S8rDVE0yVyFKPfSsCGc4wS8Fy9IZDzAH40OggmuK/Q/5e1qnHwuPlAqcYi5mS1QD4cvKUJFfczvFC1tC+41NLi2gFwmEXT5oOm586HLSYNRYNzotocwU3dmf0SCjj0rltNoTX2Bs5Sob7MTk6cZZvQsNyiFhGRMYwHKrrbg9bb0uzNVm8bflArxY1rM44YmfbsMZemxhtxhvZBy3OaZHyIqoWqbqIiEUOsehiWMheDZNJodZ/UfJhSpMxaRrPE2vb20vFwqpUSqTVYkOGK7bOE0S77Ao3DVvPCyd1TPx39zWVGVLNjCrV2orQL9+Haq0RVYMc8m3EFcxzwi+G0TcLzCPiNKV/X6/XJ1OmN8dk859HrvDC5J8iYos9N8wN8xjvIebjmt/YflOOfSsXrQgSCxjORPkHxDuSyyvYsAaepf0c6Qx73eQXm66wlpS1qldu+uz7ZSnlca11Qa1/lHXTLUN6tiu8jL44VerIcAXxjuw3G/7oyHgf3IG2mBcST4yeQj4xPJX0RPC0Smdhv4n9kaRJJjlylg6yFWJHXzkvCIy8hZaMTiRNgAch/9vR8fF/3r9/fwst+fj222/XO8L8/vvvzyT9fbF/k/axHPvgueTB0tL2C72SXENL+mpqKesZPc8lPZvNZs92Sc6OdG82m7hWq2pe0/rKOjJTmalhGOLA1jCfh22N4zHLlG3V6TRsq6+1bCKOin01M7qIPHUtp8bz0LCopSwi4qzWujk6O9v27767uX///lZS3Hnrzl6dPJuu+n6x+8Pmp9qHH3546MXi6L8ePnx0OZmQdB7373JXP9z5IdbrtYZh0DAMenO7jZrXNLw5qNaqYRjOz/jq+SaTyfKzzz479S8R+9c0SXGXu/FLyc7r2gcffDBdrVZx/fr1Yfvw4WR5eLi3Wq3qbDYb9k5O6ov5vB4fH9dPPvmk2v6Rrv+//d9o/wO7c9R1/QxUpAAAAABJRU5ErkJggg=="

wine_separator = "data:image/png;base64,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"
bossbabes_logo = "data:image/png;base64,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"
greyscale_logo = 'data:image/png;base64,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'
other_grayscale_logo = 'data:image/png;base64,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'

if Apartment::Tenant.current == "public"
  menu_title_id = SecureRandom.uuid
  section_title_id = SecureRandom.uuid
  dish_title_id = SecureRandom.uuid
  dish_description_id = SecureRandom.uuid
  dish_price_id = SecureRandom.uuid
  category_title_id = SecureRandom.uuid
  menu_title_section_id = SecureRandom.uuid
  category_dishes_id = SecureRandom.uuid

  # template_other
  col_1_id = SecureRandom.uuid
  col_2_id = SecureRandom.uuid
  col_3_id = SecureRandom.uuid


  ## AGAIN FOR BUFALINA TEMPLATE

  section_title_id = SecureRandom.uuid
  dish_title_id = SecureRandom.uuid
  dish_description_id = SecureRandom.uuid
  dish_price_id = SecureRandom.uuid
  beverage_title_id = SecureRandom.uuid
  beverage_description_id = SecureRandom.uuid
  beverage_price_id = SecureRandom.uuid
  category_title_id = SecureRandom.uuid
  category_dishes_id = SecureRandom.uuid
  category_beverages_id = SecureRandom.uuid

  # template_other
  col_1_id = SecureRandom.uuid
  col_2_id = SecureRandom.uuid
  col_3_id = SecureRandom.uuid
  col_logo_id = SecureRandom.uuid
  section_id = SecureRandom.uuid
  other_col_logo_id = SecureRandom.uuid
  other_section_id = SecureRandom.uuid



p_1_c_2 = SecureRandom.uuid
p_1_c_2_s0 = SecureRandom.uuid

  Template.create({
    name: "Bufalina",
    canon: true,
    ext: SecureRandom.uuid,
    allows: ['component'],
    accepts: ['text'],
    printAt: ['home'],
    wildcards: [],
    structure: {
      colors: {
        primary_color: 'black',
        secondary_color: '',
        tertiary_color: '',
        quaternary_color: '',
        quinary_color: ''
      },
      fontFamilies: {
        primary_font: {
          fontFamily: 'Pea Mystie',
          fontWeight: '200',
          fontStyle: 'normal',
          textTransform: 'uppercase'
        },
        secondary_font: {
          fontFamily: 'Avenir Next Condensed',
          fontWeight: '400',
          fontStyle: 'normal',
          textTransform: 'lowercase'
        },
        alternate_font: {
          fontFamily: 'Avenir Next Condensed Demi',
          fontWeight: '600',
          fontStyle: 'normal',
          textTransform: 'lowercase'
        }
      },
      styles: [
        {
          id: section_title_id,
          name: 'section_title',
          fontFamily: 'primary_font',
          color: 'primary_color',
          extra: {
            fontSize: 14,
            textDecoration: 'none',
            letterSpacing: 4.5,
            marginBottom: 10
          }
        },
        {
          id: dish_title_id,
          name: 'dish_title',
          fontFamily: 'alternate_font',
          color: 'primary_color',
          extra: {
            fontSize: 12.36,
            textDecoration: 'none',
            letterSpacing: 0.1,
            lineHeight: 1
          }
        },
        {
          id: dish_description_id,
          name: 'dish_description',
          fontFamily: 'secondary_font',
          color: 'primary_color',
          extra: {
            fontSize: 12.36,
            textDecoration: 'none',
            letterSpacing: 0.1,
            lineHeight: 1
          }
        },
        {
          id: dish_price_id,
          name: 'dish_price',
          fontFamily: 'alternate_font',
          color: 'primary_color',
          extra: {
            fontSize: 12.36,
            textDecoration: 'none',
            letterSpacing: 0.1,
            lineHeight: 1
          }
        }
      ],
      section_types: [
        {
          name: "Section Title",
          id: SecureRandom.uuid,
          structure: {
            type: "SINGLE_ELEMENT",
            elements: [
              {
                styles: section_title_id,
                text: ''
              }
            ]
          }
        },
        {
          name: "Dishes & Beers",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "DISH_TITLE",
                text: '',
                styles: dish_title_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: ' - ',
                styles: dish_description_id
              },
              {
                type: "DISH_DESCRIPTION",
                text: '',
                styles: dish_description_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: '... ',
                styles: dish_description_id
              },
              {
                type: "DISH_PRICE",
                text: '',
                styles: dish_price_id
              }
            ]
          }
        },
        {
          name: "Dishes & Beers (without description)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "DISH_TITLE",
                text: '',
                styles: dish_title_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: '... ',
                styles: dish_description_id
              },
              {
                type: "DISH_PRICE",
                text: '',
                styles: dish_price_id
              }
            ]
          }
        },
        {
          name: "Wines",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "WINE_DESCRIPTION",
                text: '',
                styles: dish_description_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: ' ',
                styles: dish_description_id
              },
              {
                type: "WINE_TITLE",
                text: '',
                styles: dish_title_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: '... ',
                styles: dish_description_id
              },
              {
                type: "WINE_PRICE",
                text: '',
                styles: dish_price_id
              }
            ]
          }
        },
        {
          name: "Wines (alternate/simplified)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "WINE_DESCRIPTION",
                text: '',
                styles: dish_description_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: '... ',
                styles: dish_description_id
              },
              {
                type: "WINE_PRICE",
                text: '',
                styles: dish_price_id
              }
            ]
          }
        }
      ],
      layouts: [
        {
          id: SecureRandom.uuid,
          name: "TWO_COLUMNS",
          multiPage: false,
          orientation: 'portrait',
          structure: [
            {
              type: 'PAGE',
              position: 0,
              background: '',
              id: SecureRandom.uuid,
              elements: [
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 0,
                  background: '',
                  span: 0.5,
                  id: SecureRandom.uuid,
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: SecureRandom.uuid,
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: col_logo_id,
                          position: 0,
                          styles: {
                            marginTop: '2.006cm',
                            marginLeft: '1cm',
                            marginRight: '1cm',
                          }
                        }
                      ]
                    },
                  ]
                },
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 0,
                  background: '',
                  span: 0.5,
                  id: SecureRandom.uuid,
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: SecureRandom.uuid,
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: other_col_logo_id,
                          position: 0,
                          styles: {
                            marginTop: '2.79cm',
                            marginLeft: '1cm',
                            marginRight: '1cm',
                          }
                        },
                      ]
                    }
                  ]
                },
              ]
            }
          ],
          sections: [
            {
              id: section_id,
              type: "SECTION",
              position: 0,
              columnId: col_logo_id,
              accepts: ['img'],
              readOnly: true,
              styles: {
                marginBottom: '1.202cm'
              }
            }
          ],
          components: [
            {
              sectionId: section_id,
              type: "IMAGE_ELEMENT",
              url: greyscale_logo,
              styles: {
                height: 61,
                width: 66
              },
              hide: true,
              position: 0,
              id: SecureRandom.uuid
            }
          ]
        },
        {
          id: "61eba2db-7ca8-49d7-9917-647154a11ba9",
          name: "TWO_COLUMNS",
          multiPage: true,
          orientation: 'landscape',
          structure: [
            {
              type: 'PAGE',
              position: 0,
              background: '',
              id: "9fcaaeed-4720-4edb-b029-0af76d7a4c07",
              elements: [
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 0,
                  background: '',
                  span: 0.5,
                  id: "3e603a16-a853-4089-8f81-90358c8afa12",
                  elements: []
                },
                {
                  type: 'CONTAINER',
                  align: 'bottom',
                  position: 1,
                  background: '',
                  span: 0.5,
                  id: "c0602c9c-9b8e-4949-91e6-866617ad2abe",
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: "ab1dca67-d7ec-48ad-ab71-c4afd817db96",
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: "b4ab7c95-46c5-43a7-89c8-6d666bccbb99",
                          position: 0,
                          styles: {
                            marginLeft: '1cm',
                            marginRight: '1cm',
                          }
                        },
                      ]
                    }
                  ]
                },
              ]
            },
            {
              type: 'PAGE',
              position: 1,
              background: '',
              id: "6d7fcf51-0be8-43bb-b8b2-37697672542b",
              elements: [
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 2,
                  background: '',
                  span: 0.5,
                  id: "8db78d89-e04f-4470-8d7e-60ba203d9184",
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: "1050d3e5-9b5a-47ae-8815-b1a81d8ba5fc",
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: "eb7634f8-6988-4755-a711-62e8d6b9230f",
                          position: 0,
                          styles: {
                            marginLeft: '1cm',
                            marginRight: '1cm',
                            marginTop: '1.917cm'
                          }
                        }
                      ]
                    },
                  ]
                },
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 3,
                  background: '',
                  span: 0.5,
                  id: "656d18a3-3711-456d-ae7c-6cd8a9212c10",
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: "e98a0a97-bc14-4b67-8b04-aeea11f62473",
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: "4d22fa72-80cf-4215-8593-e03391c5e40a",
                          position: 0,
                          styles: {
                            marginLeft: '1cm',
                            marginRight: '1cm',
                            marginTop: 147.512
                          }
                        }
                      ]
                    },
                  ]
                },
              ]
            },
            {
              type: 'PAGE',
              position: 2,
              background: '',
              id: "b141a94c-6361-4b5c-850a-f6d6ec65f021",
              elements: [
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 4,
                  background: '',
                  span: 0.5,
                  id: "7eb356c3-b6b0-454d-869e-6dd1f1220606",
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: "29ea57ac-bdcd-4949-bee8-3546fa466489",
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: "67d46c22-89fb-44ee-bd3e-0d5938e1945d",
                          position: 0,
                          styles: {
                            marginLeft: '1cm',
                            marginRight: '1cm',
                            marginTop: '1.917cm'
                          }
                        }
                      ]
                    },
                  ]
                },
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 5,
                  background: '',
                  span: 0.5,
                  id: "d08f2410-1256-43a2-90b7-74d269f9fa61",
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: "9afebc48-88b7-4e1c-97a6-c3da11420a0d",
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: "0a650b5e-c898-4b87-9f88-0078d9114dd1",
                          position: 0,
                          styles: {
                            marginLeft: '1cm',
                            marginRight: '1cm',
                            marginTop: 117.454
                          }
                        }
                      ]
                    },
                  ]
                },
              ]
            },
            {
              type: 'PAGE',
              position: 3,
              background: '',
              id: "dda83656-a21b-42e7-ae94-50c0c3b2d8c1",
              elements: [
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 6,
                  background: '',
                  span: 0.5,
                  id: "b74a0c2f-6243-4a03-a2f9-14050f477330",
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: "8594b03f-91be-47ed-b9a1-2a175e968aa6",
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: "73c97de5-b9d8-4ec7-8a17-17309ff89162",
                          position: 0,
                          styles: {
                            marginLeft: '1cm',
                            marginRight: '1cm',
                            marginTop: '1.917cm'
                          }
                        }
                      ]
                    },
                  ]
                },
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 7,
                  background: '',
                  span: 0.5,
                  id: "7b71ec98-6fb2-4dee-93ce-711f193558c7",
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: "67229b4c-7e32-4963-8f11-873fd9f1df55",
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: "d02038a4-71a7-4947-ae66-ae7a10ab7fae",
                          position: 0,
                          styles: {
                            marginLeft: '1cm',
                            marginRight: '1cm',
                            marginTop: 117.454
                          }
                        }
                      ]
                    },
                  ]
                },
              ]
            },
          ],
          sections: [
            # PAGE 0 - !
            {
              id: "54f88ae4-4170-41ab-8e9e-92e2313503fd",
              type: "SECTION",
              position: 0,
              columnId: "b4ab7c95-46c5-43a7-89c8-6d666bccbb99",
              accepts: ['img'],
              readOnly: true,
              styles: {}
            },
            # PAGE 1 - COL 1 "eb7634f8-6988-4755-a711-62e8d6b9230f" COL 2 "4d22fa72-80cf-4215-8593-e03391c5e40a"
            {
              id: "1133f45a-827b-4366-b60c-e369c9ab5a0d",
              type: "SECTION",
              position: 0,
              columnId: "eb7634f8-6988-4755-a711-62e8d6b9230f",
              accepts: ['text'],
              readOnly: false,
              styles: {}
            },
            {
              id: "efd30f81-9759-4b4a-94cb-375b90f66a72",
              type: "SECTION",
              position: 1,
              columnId: "eb7634f8-6988-4755-a711-62e8d6b9230f",
              accepts: ['img'],
              readOnly: true,
              styles: {}
            },
            {
              id: "1300b60c-02a2-454c-9cd6-48fae29e5cab",
              type: "SECTION",
              position: 2,
              columnId: "eb7634f8-6988-4755-a711-62e8d6b9230f",
              accepts: ['text'],
              readOnly: false,
              styles: {}
            },
            {
              id: "dbee2e2e-e341-483b-b0f6-f0e296b243c0",
              type: "SECTION",
              position: 0,
              columnId: "4d22fa72-80cf-4215-8593-e03391c5e40a",
              accepts: ['text'],
              readOnly: false,
              styles: {}
            },
            # PAGE 2 - COL 1 "67d46c22-89fb-44ee-bd3e-0d5938e1945d" COL 2 "0a650b5e-c898-4b87-9f88-0078d9114dd1"
            {
              id: "89198a52-2e45-458d-b4d4-d412ee65dc67",
              type: "SECTION",
              position: 0,
              columnId: "67d46c22-89fb-44ee-bd3e-0d5938e1945d",
              accepts: ['text'],
              readOnly: false,
              styles: {}
            },
            {
              id: "d7192fff-7cb7-4e3f-93a8-e7665e91d866",
              type: "SECTION",
              position: 1,
              columnId: "67d46c22-89fb-44ee-bd3e-0d5938e1945d",
              accepts: ['img'],
              readOnly: true,
              styles: {}
            },
            {
              id: "43590422-8074-4e8d-85ab-63826ea7d6df",
              type: "SECTION",
              position: 2,
              columnId: "67d46c22-89fb-44ee-bd3e-0d5938e1945d",
              accepts: ['text'],
              readOnly: false,
              styles: {}
            },
            {
              id: "0d8a53db-c5da-4a70-b806-73612280bd45",
              type: "SECTION",
              position: 0,
              columnId: "0a650b5e-c898-4b87-9f88-0078d9114dd1",
              accepts: ['img'],
              readOnly: true,
              styles: {}
            },
            {
              id: "3777afe9-143e-45a2-8078-d9098ad4c17c",
              type: "SECTION",
              position: 1,
              columnId: "0a650b5e-c898-4b87-9f88-0078d9114dd1",
              accepts: ['text'],
              readOnly: false,
              styles: {}
            },
            # PAGE 3 - COL 1 "73c97de5-b9d8-4ec7-8a17-17309ff89162" COL 2 "d02038a4-71a7-4947-ae66-ae7a10ab7fae"
            {
              id: "26559cb7-1643-4402-8f04-331dc9702f31",
              type: "SECTION",
              position: 0,
              columnId: "73c97de5-b9d8-4ec7-8a17-17309ff89162",
              accepts: ['text'],
              readOnly: false,
              styles: {}
            },
            {
              id: "ef70882e-0ec5-4a05-aba8-6522eae0b4f7",
              type: "SECTION",
              position: 1,
              columnId: "73c97de5-b9d8-4ec7-8a17-17309ff89162",
              accepts: ['img'],
              readOnly: true,
              styles: {}
            },
            {
              id: "e6c1cc27-f910-4dc6-b2ec-17f3d13a4a64",
              type: "SECTION",
              position: 2,
              columnId: "73c97de5-b9d8-4ec7-8a17-17309ff89162",
              accepts: ['text'],
              readOnly: false,
              styles: {}
            },
            {
              id: "cedd4822-c1d4-4be6-a7e5-04566bdffb67",
              type: "SECTION",
              position: 0,
              columnId: "d02038a4-71a7-4947-ae66-ae7a10ab7fae",
              accepts: ['img'],
              readOnly: true,
              styles: {}
            },
            {
              id: "08dd99eb-a1af-4c6d-bad2-49aa8ba68538",
              type: "SECTION",
              position: 1,
              columnId: "d02038a4-71a7-4947-ae66-ae7a10ab7fae",
              accepts: ['text'],
              readOnly: false,
              styles: {
                marginTop: 45
              }
            },
          ],
          components: [
            # PAGE 3
            {
              sectionId: "26559cb7-1643-4402-8f04-331dc9702f31",
              type: "SINGLE_ELEMENT",
              elements: [
                {
                  styles: section_title_id,
                  text: 'By the bottle'
                }
              ],
              hide: false,
              position: 0,
              id: "ffd8c19a-8698-4e33-8ef6-717c613dab17"
            },
            {
              sectionId: "ef70882e-0ec5-4a05-aba8-6522eae0b4f7",
              type: "IMAGE_ELEMENT",
              url: wine_separator_big,
              styles: {
                marginBottom: '0.25cm',
                marginTop: 0,
                marginLeft: -5,
              },
              hide: false,
              position: 0,
              id: "a1fd54b7-006a-4b42-917f-2ca674cf5102"
            },
            {
              sectionId: "e6c1cc27-f910-4dc6-b2ec-17f3d13a4a64",
              type: "SINGLE_ELEMENT",
              elements: [
                {
                  styles: section_title_id,
                  text: 'reds'
                }
              ],
              hide: false,
              position: 0,
              id: "29a9d164-a33b-4194-a18e-b82bba9fc3b8"
            },
            {
              sectionId: "cedd4822-c1d4-4be6-a7e5-04566bdffb67",
              type: "IMAGE_ELEMENT",
              url: wine_separator,
              styles: {
                marginBottom: '0.25cm',
                marginTop: 0,
                marginLeft: '-1cm',
              },
              hide: true,
              position: 0,
              id: "7a27349d-b3f7-414f-b374-9619bbde116f"
            },
            {
              sectionId: "08dd99eb-a1af-4c6d-bad2-49aa8ba68538",
              type: "SINGLE_ELEMENT",
              elements: [
                {
                  styles: section_title_id,
                  text: 'wines, continued'
                }
              ],
              hide: false,
              position: 0,
              id: "965df707-2f38-4016-b46a-73b0060fc5db"
            },
            # PAGE 2
            {
              sectionId: "89198a52-2e45-458d-b4d4-d412ee65dc67",
              type: "SINGLE_ELEMENT",
              elements: [
                {
                  styles: section_title_id,
                  text: 'By the bottle'
                }
              ],
              hide: false,
              position: 0,
              id: "d3764eec-09d2-4dae-a89d-1379a347f154"
            },
            {
              sectionId: "d7192fff-7cb7-4e3f-93a8-e7665e91d866",
              type: "IMAGE_ELEMENT",
              url: wine_separator_big,
              styles: {
                marginBottom: '0.25cm',
                marginTop: 0,
                marginLeft: -5,
              },
              hide: false,
              position: 0,
              id: "578ba65a-7d4c-4d82-b2f1-4d183ea04938"
            },
            {
              sectionId: "43590422-8074-4e8d-85ab-63826ea7d6df",
              type: "SINGLE_ELEMENT",
              elements: [
                {
                  styles: section_title_id,
                  text: 'sparkling'
                }
              ],
              hide: false,
              position: 0,
              id: "5cb826bf-c0bd-4fe1-bc30-ddfa4bb684ed"
            },
            {
              sectionId: "0d8a53db-c5da-4a70-b806-73612280bd45",
              type: "IMAGE_ELEMENT",
              url: wine_separator,
              styles: {
                marginBottom: '0.25cm',
                marginTop: 0,
                marginLeft: '-1cm',
              },
              hide: true,
              position: 0,
              id: "631ff4aa-61dd-4cca-981c-066c07563ca4"
            },
            {
              sectionId: "3777afe9-143e-45a2-8078-d9098ad4c17c",
              type: "SINGLE_ELEMENT",
              elements: [
                {
                  styles: section_title_id,
                  text: 'wines, continued'
                }
              ],
              hide: false,
              position: 0,
              id: "b1a640af-b1e7-4a59-8d32-517545ade794"
            },
            # PAGE 1
            {
              sectionId: "1133f45a-827b-4366-b60c-e369c9ab5a0d",
              type: "SINGLE_ELEMENT",
              elements: [
                {
                  styles: section_title_id,
                  text: 'By the glass'
                }
              ],
              hide: false,
              position: 0,
              id: "299647a9-0bf4-4989-a680-a60932ef6125"
            },
            {
              sectionId: "efd30f81-9759-4b4a-94cb-375b90f66a72",
              type: "IMAGE_ELEMENT",
              url: wine_separator_big,
              styles: {
                marginBottom: '0.25cm',
                marginTop: 0,
                marginLeft: -5,
              },
              hide: false,
              position: 0,
              id: "b5a5c636-2254-483f-ad5c-1d4edda953b3"
            },
            {
              sectionId: "1300b60c-02a2-454c-9cd6-48fae29e5cab",
              type: "SINGLE_ELEMENT",
              elements: [
                {
                  styles: section_title_id,
                  text: 'sparkling'
                }
              ],
              hide: false,
              position: 0,
              id: "edfef56d-8164-4bdd-9868-577fa0de48a0"
            },
            {
              sectionId: "dbee2e2e-e341-483b-b0f6-f0e296b243c0",
              type: "SINGLE_ELEMENT",
              elements: [
                {
                  styles: section_title_id,
                  text: 'beer'
                }
              ],
              hide: false,
              position: 0,
              id: "92d2c052-788c-4c72-b2c7-79b6c576b7ac"
            },
            # PAGE 0
            {
              sectionId: "54f88ae4-4170-41ab-8e9e-92e2313503fd",
              type: "IMAGE_ELEMENT",
              url: greyscale_logo,
              styles: {
                height: 119,
                width: 129,
                marginLeft: '7.716cm',
                marginBottom: '1.522cm',
              },
              hide: true,
              position: 0,
              id: "169b6f1f-9ee2-4374-9656-3a1db0a88a2b"
            }
          ]
        }
      ]
    }
  })


  Template.create({
    name: "Happy Hour Menu",
    canon: true,
    ext: SecureRandom.uuid,
    allows: ['component'],
    accepts: ['text'],
    printAt: ['home'],
    wildcards: [],
    structure: {
      colors: {
        primary_color: 'black',
        secondary_color: '',
        tertiary_color: '',
        quaternary_color: '',
        quinary_color: ''
      },
      fontFamilies: {
        primary_font: {
          fontFamily: 'Pea Mystie',
          fontWeight: '200',
          fontStyle: 'normal',
          textTransform: 'uppercase'
        },
        secondary_font: {
          fontFamily: 'Avenir Next Condensed',
          fontWeight: '400',
          fontStyle: 'normal',
          textTransform: 'lowercase'
        },
        alternate_font: {
          fontFamily: 'Avenir Next Condensed Demi',
          fontWeight: '600',
          fontStyle: 'normal',
          textTransform: 'lowercase'
        }
      },
      styles: [
        {
          id: section_title_id,
          name: 'section_title',
          fontFamily: 'primary_font',
          color: 'primary_color',
          extra: {
            fontSize: 14,
            textDecoration: 'none',
            letterSpacing: 4.5,
            marginBottom: 20,
            marginTop: 15
          }
        },
        {
          id: dish_title_id,
          name: 'dish_title',
          fontFamily: 'alternate_font',
          color: 'primary_color',
          extra: {
            fontSize: 12.36,
            textDecoration: 'none',
            letterSpacing: 0.1,
            lineHeight: 1
          }
        },
        {
          id: dish_description_id,
          name: 'dish_description',
          fontFamily: 'secondary_font',
          color: 'primary_color',
          extra: {
            fontSize: 12.36,
            textDecoration: 'none',
            letterSpacing: 0.1,
            lineHeight: 1
          }
        },
        {
          id: dish_price_id,
          name: 'dish_price',
          fontFamily: 'alternate_font',
          color: 'primary_color',
          extra: {
            fontSize: 12.36,
            textDecoration: 'none',
            letterSpacing: 0.1,
            lineHeight: 1
          }
        }
      ],
      section_types: [
        {
          name: "Section Title",
          id: SecureRandom.uuid,
          structure: {
            type: "SINGLE_ELEMENT",
            elements: [
              {
                styles: section_title_id,
                text: ''
              }
            ]
          }
        },
        {
          name: "Dishes & Beers",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "DISH_TITLE",
                text: '',
                styles: dish_title_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: ' - ',
                styles: dish_description_id
              },
              {
                type: "DISH_DESCRIPTION",
                text: '',
                styles: dish_description_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: '... ',
                styles: dish_description_id
              },
              {
                type: "DISH_PRICE",
                text: '',
                styles: dish_price_id
              }
            ]
          }
        },
        {
          name: "Dishes & Beers (without description)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "DISH_TITLE",
                text: '',
                styles: dish_title_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: '... ',
                styles: dish_description_id
              },
              {
                type: "DISH_PRICE",
                text: '',
                styles: dish_price_id
              }
            ]
          }
        },
        {
          name: "Dishes & Beers (without price)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "DISH_TITLE",
                text: '',
                styles: dish_title_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: ' - ',
                styles: dish_description_id
              },
              {
                type: "DISH_DESCRIPTION",
                text: '',
                styles: dish_description_id
              }
            ]
          }
        },
        {
          name: "Dishes & Beers (without description or price)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "DISH_TITLE",
                text: '',
                styles: dish_title_id
              },
            ]
          }
        },
        {
          name: "Wines",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "WINE_DESCRIPTION",
                text: '',
                styles: dish_description_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: ' ',
                styles: dish_description_id
              },
              {
                type: "WINE_TITLE",
                text: '',
                styles: dish_title_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: '... ',
                styles: dish_description_id
              },
              {
                type: "WINE_PRICE",
                text: '',
                styles: dish_price_id
              }
            ]
          }
        },
        {
          name: "Wines (alternate/simplified)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "WINE_DESCRIPTION",
                text: '',
                styles: dish_description_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: '... ',
                styles: dish_description_id
              },
              {
                type: "WINE_PRICE",
                text: '',
                styles: dish_price_id
              }
            ]
          }
        },
        {
          name: "Wines (without price)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "WINE_DESCRIPTION",
                text: '',
                styles: dish_description_id
              },
              {
                type: "ELEMENT_SEPARATOR",
                text: ' ',
                styles: dish_description_id
              },
              {
                type: "WINE_TITLE",
                text: '',
                styles: dish_title_id
              }
            ]
          }
        },
        {
          name: "Wines (alternate/simplified, without price)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: true,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 10.5
            },
            elements: [
              {
                type: "WINE_DESCRIPTION",
                text: '',
                styles: dish_description_id
              }
            ]
          }
        }
      ],
      layouts: [
        {
          id: SecureRandom.uuid,
          name: "ONE_COLUMN",
          multiPage: false,
          orientation: 'portrait',
          structure: [
            {
              type: 'PAGE',
              position: 0,
              background: '',
              id: SecureRandom.uuid,
              elements: [
                {
                  type: 'CONTAINER',
                  align: 'bottom',
                  position: 0,
                  background: '',
                  span: 0.5,
                  id: SecureRandom.uuid,
                  elements: [
#                    {
#                      type: "ROW",
#                      position: 0,
#                      align: 'top',
#                      id: SecureRandom.uuid,
#                      elements: [
#                        {
#                          type: "COLUMN",
#                          span: 1,
#                          id: col_logo_id,
#                          position: 0,
#                          styles: {
#                            marginTop: '2.006cm',
#                            marginLeft: '1.75cm',
#                            marginRight: '1cm',
#                          }
#                        },
#                      ]
#                    },
                    {
                      type: "ROW",
                      position: 1,
                      align: 'bottom',
                      id: SecureRandom.uuid,
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: ccc = SecureRandom.uuid,
                          position: 0,
                          styles: {
                            marginBottom: '3.5cm',
                            marginLeft: '1.75cm',
                            marginRight: '1cm',
                          }
                        }
                      ]
                    },
                  ]
                },
                {
                  type: 'CONTAINER',
                  align: 'bottom',
                  position: 0,
                  background: '',
                  span: 0.5,
                  classed: 'hide-on-web',
                  id: SecureRandom.uuid,
                  elements: [
#                    {
#                      type: "ROW",
#                      position: 0,
#                      align: 'top',
#                      id: SecureRandom.uuid,
#                      elements: [
#                        {
#                          type: "COLUMN",
#                          span: 1,
#                          id: col_logo_id,
#                          position: 0,
#                          styles: {
#                            marginTop: '2.006cm',
#                            marginLeft: '1.75cm',
#                            marginRight: '1cm',
#                          }
#                        },
#                      ]
#                    },
                    {
                      type: "ROW",
                      position: 1,
                      align: 'bottom',
                      id: SecureRandom.uuid,
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: ccc,
                          position: 0,
                          styles: {
                            marginBottom: '3.5cm',
                            marginLeft: '1.75cm',
                            marginRight: '1cm',
                          }
                        }
                      ]
                    },
                  ]
                },
              ]
            }
          ],
          sections: [
            {
              id: section_id,
              type: "SECTION",
              position: 0,
              columnId: col_logo_id,
              accepts: ['img'],
              readOnly: true,
              styles: {
                marginBottom: '3.25cm'
              }
            }
          ],
          components: [
            {
              sectionId: section_id,
              type: "IMAGE_ELEMENT",
              url: other_grayscale_logo,
              styles: {
                height: 61,
                width: 66
              },
              hide: true,
              position: 0,
              id: SecureRandom.uuid
            }
          ]
        }
      ]
    }
  })

  Template.create({
    name: "Schedule [BossBabes]",
    canon: true,
    ext: SecureRandom.uuid,
    allows: ['component', 'color'],
    accepts: ['text'],
    printAt: ['home'],
    wildcards: ['secondary_color'],
    structure: {
      colors: {
        primary_color: 'black',
        secondary_color: '#F9B4A6',
        tertiary_color: 'white',
        quaternary_color: '',
        quinary_color: ''
      },
      fontFamilies: {
        primary_font: {
          fontFamily: 'Futura Medium',
          fontWeight: 'normal',
          fontStyle: 'normal',
          textTransform: 'none'
        },
        secondary_font: {
          fontFamily: '',
          fontWeight: '',
          fontStyle: '',
          textTransform: ''
        },
        alternate_font: {
          fontFamily: '',
          fontWeight: '',
          fontStyle: '',
          textTransform: ''
        }
      },
      styles: [
        {
          id: section_title_id,
          name: 'section_title',
          fontFamily: 'primary_font',
          color: 'primary_color',
          extra: {
            fontSize: 16,
            textDecoration: 'none',
            letterSpacing: 1.25,
            # marginBottom: 2.5,
            textAlign: 'center',
            display: 'block',
            lineHeight: "16px"
          }
        },
        {
          id: event_title_id = SecureRandom.uuid,
          name: 'event_title',
          fontFamily: 'primary_font',
          color: 'primary_color',
          extra: {
            fontSize: 18,
            textDecoration: 'none',
            letterSpacing: 1.25,
            # marginBottom: 2.5,
            textAlign: 'center',
            display: 'block',
            lineHeight: 1
          }
        },
        {
          id: dish_title_id,
          name: 'dish_title',
          fontFamily: 'primary_font',
          color: 'primary_color',
          extra: {
            fontSize: 15,
            textDecoration: 'none',
            letterSpacing: 0.5,
            lineHeight: 1,
            textAlign: 'center',
            display: 'block',
            # marginTop: 7.5
          }
        }
      ],
      section_types: [
        {
          name: "Title",
          id: SecureRandom.uuid,
          structure: {
            type: "SINGLE_ELEMENT",
            elements: [
              {
                styles: section_title_id,
                text: ''
              }
            ]
          }
        },
        {
          name: "Event (2 rows)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: false,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 15,
              marginTop: "0.5cm"
            },
            elements: [
              {
                type: "SINGLE_ELEMENT_#{SecureRandom.uuid}",
                text: '',
                styles: event_title_id
              },
              {
                type: "SINGLE_ELEMENT_#{SecureRandom.uuid}",
                text: '',
                styles: dish_title_id
              },
            ]
          }
        },
        {
          name: "Event (3 rows)",
          id: SecureRandom.uuid,
          structure: {
            type: "COMPOUND_ELEMENT",
            inline: false,
            styles: {
              display: 'block',
              lineHeight: 0,
              marginBottom: 15,
              marginTop: "0.5cm"
            },
            elements: [
              {
                type: "SINGLE_ELEMENT_#{SecureRandom.uuid}",
                text: '',
                styles: event_title_id
              },
              {
                type: "SINGLE_ELEMENT_#{SecureRandom.uuid}",
                text: '',
                styles: dish_title_id
              },
              {
                type: "SINGLE_ELEMENT_#{SecureRandom.uuid}",
                text: '',
                styles: dish_title_id
              },
            ]
          }
        },
      ],
      layouts: [
        {
          id: SecureRandom.uuid,
          name: "ONE_COLUMN",
          multiPage: false,
          orientation: 'portrait',
          structure: [
            {
              type: 'PAGE',
              position: 0,
              background: '',
              id: SecureRandom.uuid,
              elements: [
                {
                  type: 'CONTAINER',
                  align: 'top',
                  position: 0,
                  background: '',
                  span: 1,
                  id: SecureRandom.uuid,
                  elements: [
                    {
                      type: "ROW",
                      position: 0,
                      id: SecureRandom.uuid,
                      singleRow: true,
                      elements: [
                        {
                          type: "COLUMN",
                          span: 1,
                          id: col_logo_id,
                          position: 0,
                          singleColumn: true,
                          styles: {
                            marginTop: "0.4cm",
                            marginLeft: "0.65cm",
                            marginRight: "0.65cm",
                            marginBottom: "0.4cm",
                            # marginTop: "0.9cm",
                            # marginLeft: "1.2cm",
                            # marginRight: "1.2cm",
                            # marginBottom: "0.9cm",
                            # paddingTop: "1.25cm",
                            # height: "10.275in",
                            border: "4.75px solid %%{secondary_color}%%",
                            backgroundClip: "content-box",
                            padding: "0.7cm 0.45cm",
                            # outlineOffset: 15,
                            backgroundColor: "%%{secondary_color}%%"
                          }
                        }
                      ]
                    },
                  ]
                },
              ]
            }
          ],
          sections: [
            {
              id: section_id,
              type: "SECTION",
              position: 0,
              columnId: col_logo_id,
              accepts: ['img'],
              readOnly: true,
              styles: {
                marginTop: "1.25cm"
              }
            },
            {
              id: other_section_id,
              type: "SECTION",
              position: 1,
              columnId: col_logo_id,
              accepts: ['text'],
              readOnly: false,
              styles: {
              }
            },
          ],
          components: [
            {
              sectionId: section_id,
              type: "IMAGE_ELEMENT",
              url: bossbabes_logo,
              styles: {
                height: 60,
                width: 98.63,
                display: 'block',
                margin: '0 auto',
              },
              hide: false,
              position: 0,
              id: SecureRandom.uuid
            }
          ]
        },
      ]
    }
  })

  @user = {name: 'Steven Dilley', email: "example@example.com", password: "iamexample", password_confirmation: "iamexample"}

  # @user.save

  @account = Account.new(subdomain: "bufalina", owner_attributes: @user)
  # byebug
  if @account.valid?
    Apartment::Tenant.create("bufalina")
    Apartment::Tenant.switch!("bufalina")
    # byebug
    @account.owner.skip_confirmation!
    @account.owner.skip_confirmation_notification!
    @account.save
    @account.owner.role = "owner"
    @account.owner.subdomain = @account.subdomain
    @account.owner.save
  end
end




