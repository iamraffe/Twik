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
      components:"[{\"sectionId\":\"58cb2bd7-7652-4540-bf50-5baa1760130a\",\"type\":\"IMAGE_ELEMENT\",\"url\":\"http://bufalinadue.menustyler.com/img/bufalina-logo-greyscale.png\",\"styles\":{\"height\":61,\"width\":66},\"hide\":true,\"position\":0,\"id\":\"b004c513-b05b-48e4-95d5-aa903d18cc61\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eStarters\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"209aaaaa-aeac-4b86-ad9b-ef4c36758ecd\",\"position\":0,\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003ePizza\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"e57bacc3-427a-4163-9594-0fc12a96640e\",\"position\":0,\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003emarinara\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, garlic, oregano\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e8\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"e9dc638d-adbb-4c96-a425-b47b2586fae0\",\"position\":1,\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003enuts and olives\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003emarinated castelvatrano olives, rosemary marcona, almonds, pistachios\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\\n\u003cspan\u003e\u003cbr\u003e\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"07066c63-0ec2-4d9b-a98c-fb3e898b4199\",\"position\":1,\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003emargherita\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, mozzarella, basil, parm\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":2,\"id\":\"ef0628ac-3451-4b76-b575-a8ea64291662\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eCalabrese\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, mozzarella, basil, salami, serrano, garlic\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":4,\"id\":\"226c0afe-c37d-4d54-ae66-9a6dff14d711\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eFresca\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003eprosciutto piccante, arugula, meyer lemon, mozz\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e16\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":5,\"id\":\"9772fc03-9880-484e-9eb2-a8428be9f138\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003etaleggio\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003esausage, mozzarella, scallion\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":6,\"id\":\"84cb31f8-2dd3-4630-98ba-2182c0185f90\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eSpanish chorizo\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, mozz, manchego, roasted peppers\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e15\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":7,\"id\":\"fb128007-b8b3-4636-a982-0ff5c268bb42\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eanchovy\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomato, black olive, chile flake, garlic, olive oil\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e15\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":8,\"id\":\"7178fd91-4054-4d87-a2d1-26cb095eb629\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ecalzone\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003esausage, roasted red peppers, ricotta, mozz\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e17\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":9,\"id\":\"d7942d93-63a3-480b-9d53-d09719d44850\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eROSÉ\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"b0f2ee17-0b44-4cf4-807a-2279c9a6b852\",\"position\":0,\"sectionId\":\"536c134b-0196-4500-96ca-a7d8f8a4ecc8\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2015 cirelli cerasuolo d'abruzzo\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003emontepulciano\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e11\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"c0d743e5-de85-4031-a9d2-effe37464aba\",\"position\":1,\"sectionId\":\"536c134b-0196-4500-96ca-a7d8f8a4ecc8\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 tenuta ripalte costa toscana rosato\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003ealeatico\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":2,\"id\":\"38bcf756-80f9-4841-aee2-efc5bcb3a4e2\",\"sectionId\":\"536c134b-0196-4500-96ca-a7d8f8a4ecc8\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eToday's mozzarella\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e8\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":2,\"id\":\"12ed4d96-5cde-4184-9465-a8a501ff41d1\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eHouse burrata\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ebroccoli rabe, balsamic, olive oil\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":3,\"id\":\"3e8017dd-0ad8-4ed9-bee2-f6f2dc1620f0\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ebibb salad\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003escarlet turnips, radish, herb crème fraîche vinaigrette\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":4,\"id\":\"ffc7db90-9f28-43d9-9ff0-9cd3ed4bd10e\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ebitter\u0026nbsp;greens salad\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003efennel, frisée, arugula, radicchio, pecorino, champagne vinaigrette\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":5,\"id\":\"bd6321d3-8316-4c20-a213-de0275a49be2\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eGnocchi arrabiata\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":6,\"id\":\"a6b4405b-0e4b-49ee-b649-2b9aeda2ca5e\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eMeat Plate\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ebiellese coppa, framani chorizo, smoking goose salame cotto, house pickles, mostarda\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":7,\"id\":\"1773c231-d924-4d72-b787-87b48a12a13b\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eCheese plate\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003etomme crayeuse, der scharfe maxx, ewe calf to be kidding me, marcona almonds, orange marmalade\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":8,\"id\":\"39ecd817-e24f-4a6f-8c34-e699b88278df\",\"sectionId\":\"b4f912be-0ce2-4575-bcf6-005cc4d4f271\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003edessert\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"fd023350-ae25-4cbe-ae17-8fa0e9003d0f\",\"position\":0,\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ehorchata panna cotta\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ebutternut squash ice cream\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"510fa44c-eb00-49a4-9231-e7dfc8c32b82\",\"position\":1,\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003evanilla pudding\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ecaramelized banana, vanilla wafer, pecan praline\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":2,\"id\":\"b754b395-930a-4fc2-a42d-7a469214fd95\",\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003echocolate chip cookie\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e4\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":3,\"id\":\"9cdd6489-b847-4d39-b232-6c49019574b2\",\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env rare wine co. baltimore rainwater madeira\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003everdelho, tinta negra mole (3oz)\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"1a220a8a-68a0-4393-b09d-84c5ac36d164\",\"position\":5,\"sectionId\":\"3274e679-948e-4910-8948-afa42872407c\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eButternut squash\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003esage, mozz, piave\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":3,\"id\":\"9ca653b4-faa5-405d-8e40-ebde4ee07aad\",\"sectionId\":\"371bdb75-2bdb-41ef-b141-54f93c80c853\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eSPARKLING\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"c597e35d-9f24-4c8d-9914-e77d369c78bd\",\"position\":0,\"sectionId\":\"41ec6865-bf36-4903-9f41-f15ed226d3e7\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env barbolini lambrusco di sorbara\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003elambrusco\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e11\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"b83ebbd8-20e3-4d57-9b98-12b9e624f249\",\"position\":1,\"sectionId\":\"41ec6865-bf36-4903-9f41-f15ed226d3e7\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env franck peillot \\\"montagnieu\\\" bugey\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003echardonnay, altesse\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":2,\"id\":\"8dc06a98-21d1-44ee-a2b1-4e7f82a37139\",\"sectionId\":\"41ec6865-bf36-4903-9f41-f15ed226d3e7\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eSherry\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"912b6d48-ff54-42ee-ae2a-8282f95fb63e\",\"position\":0,\"sectionId\":\"bffae0df-961c-4017-9cdf-c8974dfedd77\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003ewhite\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"76fb1fd2-f27f-4618-8dd0-3728c719a6e6\",\"position\":0,\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env valdespino fino \\\"inocente\\\"\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003epalomino\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"6fa4c9d7-dccb-40a2-9c4b-0c7c27a16b37\",\"position\":1,\"sectionId\":\"bffae0df-961c-4017-9cdf-c8974dfedd77\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 domaine de la patience “from the tank”\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003echardonnay\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"86ba7cd0-a0cf-45ed-92be-65acae9e3a66\",\"position\":1,\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2013 françois cazin cour cheverny\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003eromorantin\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":2,\"id\":\"c09d1ae0-e3a3-40bb-a190-dbc74b28dbc8\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 trimbach\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003epinot blanc\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e11\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":3,\"id\":\"5202b1f1-394c-49b1-9661-71483767b2d3\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2015 weiser-kunstler mosel\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003eriesling\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":4,\"id\":\"a5099ad5-15e1-4dba-9e81-341a92f46843\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 pépière \\\"les gras moutons\\\" muscadet\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003emelon de bourgogne\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":5,\"id\":\"31e1fa32-7d19-417f-b938-c5ab730f1271\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2015 lieu dit sauvignon blanc\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003esanta ynez valley\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":6,\"id\":\"8c38971b-7e56-41fe-a608-50a283ffb311\",\"sectionId\":\"6749ab58-b6a9-4070-b97f-14d70e9e20f1\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eRed\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"55105b27-8c2f-41ff-abc8-abbef3fe57ea\",\"position\":0,\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eBEER\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"f806dec5-75fd-4ec7-985a-f3c73b0b86d8\",\"position\":0,\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2014 estézargues “from the tank” côtes du rhône\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003e\u0026nbsp;grenache, syrah\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"id\":\"d8971a9f-7e71-4709-b579-e17c52231441\",\"position\":1,\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003ePINTHOUSE\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003eelectric jellyfish ipa\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"b65e91f8-35cc-41ff-aa55-3a4e9b83008d\",\"position\":1,\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003env sherman \u0026amp; hooker \\\"shebang!\\\" ninth cuvée\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003ezinfandel, grenache\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":2,\"id\":\"c08a11d4-5be5-44c5-a344-bf7dc1fc2d3f\",\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2015 jean-paul brun \\\"l'ancien\\\"\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003ebeaujolais gamay\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e12\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":3,\"id\":\"c2434329-dc60-4c0f-98c1-055559bad564\",\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e015 la clarine farm \\\"jambalaia rouge\\\"\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003emourvedre, marsanne, grenache, syrah\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e14\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":4,\"id\":\"bbafad8f-f906-408d-8475-7a5ea2f1228d\",\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"\u003cspan\u003e2013 sandhi santa rita hills\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"\u003cspan\u003ePINOT NOIR\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"\u003cspan\u003e16\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"7f0b80ff-4dd1-43eb-ade2-9aadfd20d627\",\"position\":5,\"id\":\"84c5c7d6-c1d8-4ef3-b2f1-e75cbab2979e\",\"sectionId\":\"e2c4393a-b427-488c-887a-dde4c4172236\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003erabbit hole brewing\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e\u003cstrong\u003eoff with your red ipa\u003c/strong\u003e\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":2,\"id\":\"dfd28cfb-7f80-4d2f-87ba-8a5ff949c4ed\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eLIVE OAK\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ehefeweizen\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":3,\"id\":\"8dfbbb05-f161-43ab-92c7-0b17f0cbd96d\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eBLUE OWL\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003evan dayum! sour red ale\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":4,\"id\":\"b7572d82-433b-47ad-bb44-bec1c5214349\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eSTRANGE LAND\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003eaustinite pilz\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e6\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":5,\"id\":\"71b899e2-f114-4558-b4fb-18cde1efe244\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eLONE STAR\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003e12 OZ.\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e3\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":6,\"id\":\"105f680b-62bf-461d-a72e-8aab3871c96e\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eARGUS CIDERY\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003eciderkin 12 oz\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e7\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":7,\"id\":\"ac5f9f99-7cec-4c8a-b285-51127b0c0e0f\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003eJESTER KING\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003ecommercial suicide mild farmhouse ale\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e10\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"position\":8,\"id\":\"a25688ba-2aa5-4e09-a7c2-ea7902848170\",\"sectionId\":\"1cbde551-e722-44a8-b176-6d02c94c31c6\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"\u003cspan\u003eOther drinks\u003c/span\u003e\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"3a47e7cf-e332-4112-b307-3c4e60245ca5\",\"id\":\"31f8958f-2296-4f5b-89c9-b410d42d5ba3\",\"position\":0,\"sectionId\":\"3dab7395-2460-4453-a82c-5361c68569fd\"},{\"styles\":"+section_type_wine.to_json+",\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"\u003cspan\u003e\u0026nbsp;\u003c/span\u003e\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"\u003cspan\u003emexican coke, diet coke, topo chico, san pellegrino lemon or orange\u003c/span\u003e\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"\u003cspan\u003e3\u003c/span\u003e\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"9840760d-0eb2-47fd-9fd5-f8d749a5256a\",\"id\":\"cd5cefa5-a918-406b-bebb-32d255451e8e\",\"position\":1,\"sectionId\":\"3dab7395-2460-4453-a82c-5361c68569fd\"}]"
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
      components: "[{\"sectionId\":\"b42b466d-effe-4461-8650-2603099ef348\",\"type\":\"IMAGE_ELEMENT\",\"url\":\"http://bufalinadue.menustyler.com/img/bufalina-logo-greyscale.png\",\"styles\":{\"height\":61,\"width\":66},\"hide\":true,\"position\":0,\"id\":\"9c9b3e62-4927-41da-8345-d9241dd922b0\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>Sparkling</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"fbb77b55-45aa-4dba-bf5a-41a9a1cb37c8\",\"position\":0,\"sectionId\":\"96fdea84-0764-4f46-ae25-16f7919a79f6\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>RED</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"7339daa5-6e65-4e89-9954-5d5834f657bb\",\"position\":0,\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>SHERRY</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":0,\"id\":\"59ed1e24-735c-48b9-97da-2be612222a39\",\"sectionId\":\"c0a896df-fba1-47d7-87de-8d406b9775ab\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>WHITE</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":0,\"id\":\"e4770e79-a6f4-4c80-8177-28e6bc3adf6d\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>ROSÉ</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":1,\"id\":\"f3bf7472-03a4-46dc-998f-2677dbc9da06\",\"sectionId\":\"b0e6098b-70dc-4ac5-9d1d-99446e743670\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>BEER</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":0,\"id\":\"a7a04586-2d7f-40ab-ab25-6e57f9ba25c3\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>OTHER DRINKS</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"position\":1,\"id\":\"e8d5cbb9-41e6-4e22-adc1-05afdfd02e97\",\"sectionId\":\"936d3d1f-bd6b-420f-9b5b-534ee02f1c07\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>STARTERS</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"b67e671c-f5cc-4816-8be5-c5d23ff9e89e\",\"position\":0,\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>PIZZA</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"1d660f05-8296-437c-8004-bdd5a8eb4460\",\"position\":0,\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"SINGLE_ELEMENT\",\"elements\":[{\"text\":\"<span>DESSERT</span>\",\"styles\":\""+section_title_id+"\"}],\"structureId\":\"8c4ce65b-f8d5-4196-82df-bf29610dbda6\",\"id\":\"81415c30-de08-4213-832f-21699872a827\",\"position\":0,\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>horchata panna cotta</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>butternut squash ice cream</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"id\":\"616611bc-4e0d-4895-b688-11f28ed2ae52\",\"position\":1,\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>vanilla pudding</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- caramelized banana, vanilla wafer, pecan praline</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":2,\"id\":\"01dd3991-0439-4416-98d9-22dad1656f22\",\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>nv rare wine co.</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>. baltimore rainwater madeira verdelho, tinta negra mole (3oz)</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":4,\"id\":\"38045844-cb01-46b0-9f85-75df7dc70f2f\",\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>chocolate chip cookie</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>4</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"977d6b8e-0aef-444e-8c90-4fae83bd8ae4\",\"id\":\"9aac396c-691d-422c-a668-b1b611189ac0\",\"position\":3,\"sectionId\":\"7dc1c6e6-baf9-4157-b510-ed07df96cbb1\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>marinara</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- tomato, garlic, oregano</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>8</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"id\":\"074a61e2-a0f2-4714-a761-019bbe00952e\",\"position\":1,\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>margherita</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- tomato, mozzarella, basil, parm</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":2,\"id\":\"675bfb52-7bf0-416f-b234-ab876c2b1830\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>calabrese</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomato, mozzarella, basil, salami, serrano, garlic</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":3,\"id\":\"a12456cb-9b07-43be-a318-b119d2b81068\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>fresca</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>prosciutto piccante, arugula, meyer lemon, mozz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>16</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":4,\"id\":\"690d7a8d-4bf9-4cb7-941e-13785d6d81f0\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>taleggio</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>sausage, mozzarella, scallion</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":5,\"id\":\"e69f8e56-6090-4227-aa3a-407318c430d2\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>spanish chorizo</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomato, mozz, manchego, roasted peppers</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>15</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":6,\"id\":\"8130093b-9a84-4afb-b7b5-f620475e539f\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>anchovy</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomato, black olive, chile flake, garlic, olive oil</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>15</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":7,\"id\":\"861b74bc-10ed-4f2d-b113-04905a9b7bf3\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>calzone</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomato, basil, onion, sausage, roasted red peppers, ricotta, parm, mozz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>17</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":8,\"id\":\"574ed53d-8d20-4bc5-be73-1f2b6d5c64f0\",\"sectionId\":\"6a0bf38b-3720-4e4d-bc15-abc7193122a3\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>nuts and olives</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>marinated castelvatrano olives, rosemary marcona, almonds, pistachios</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"id\":\"8c2b6876-76b4-4f75-8cef-6343e421db13\",\"position\":1,\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>house burrata</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>broccoli rabe, balsamic, olive oil</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":3,\"id\":\"bc1d6bec-d4ac-4ec9-9ab4-35eecf69b9d7\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>bibb salad</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>scarlet turnips, radish, herb crème fraîche dressing</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":4,\"id\":\"e51e9ce5-ab89-48ad-a27f-cd9fe7d34589\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>bitter greens salad</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>fennel, frisée, arugula, radicchio, pecorino, champagne vinaigrette</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":5,\"id\":\"f19fa3d2-c89b-476a-b578-b04c9dd3f2f0\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>meat plate</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>biellese coppa, framani chorizo, smoking goose salame cotto, house pickles, mostarda</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":6,\"id\":\"0aa20ee7-34b5-4660-a93c-57514d0c1959\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>cheese plate</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>tomme crayeuse, der scharfe maxx, ewe calf to be kidding me, marcona almonds, orange marmalade</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":7,\"id\":\"2584bafd-aeb8-442e-bef2-d4a1799e387f\",\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>today's mozzarella</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>8</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"977d6b8e-0aef-444e-8c90-4fae83bd8ae4\",\"id\":\"9ae35f2c-99ff-4966-af11-096506775c9d\",\"position\":2,\"sectionId\":\"40c8f533-5d43-4076-bf44-0049a557e9cb\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>nv barbolini lambrusco di sorbara</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>lambrusco</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>11</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"684cef96-7975-47bd-9a9c-3ad0e8749b76\",\"position\":1,\"sectionId\":\"96fdea84-0764-4f46-ae25-16f7919a79f6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>nv franck peillot \\\"montagnieu\\\" bugey</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>chardonnay, altesse</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":2,\"id\":\"bbe757a2-095f-4651-b750-8214c83c45e6\",\"sectionId\":\"96fdea84-0764-4f46-ae25-16f7919a79f6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 cirelli cerasuolo d'abruzzo</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>montepulciano</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>11</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"3c08fe95-03b9-41de-9bdf-aedf63e3e30f\",\"position\":2,\"sectionId\":\"b0e6098b-70dc-4ac5-9d1d-99446e743670\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>nv valdespino fino \\\"inocente\\\"</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>palomino</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"4d24ec18-76c1-426e-8dcd-40843d353c90\",\"position\":1,\"sectionId\":\"c0a896df-fba1-47d7-87de-8d406b9775ab\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 domaine de la patience “from the tank</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>chardonnay</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"6d4fe380-c0f5-4058-a3ee-74a20f90d939\",\"position\":1,\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2013 françois cazin cour cheverny</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>romorantin</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":2,\"id\":\"23f8b744-e78f-4295-9d1b-ba8ebd08c684\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 trimbach</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>pinot blanc</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>11</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":3,\"id\":\"ca1d9366-df1b-4594-a1d5-a49e264232aa\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 müller-grossman \\\"steiner point\\\"kremstal</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>riesling</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":4,\"id\":\"b9fec733-3aed-4798-af36-233f89313c8a\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 pépière \\\"les gras moutons\\\" muscadet</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>melon de bourgogne</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":5,\"id\":\"bbb71069-f789-469e-8f9b-ffdfd9f08cc6\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 lieu dit santa ynez valley</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>sauvignon blanc</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":6,\"id\":\"2ad59aa0-da81-47f2-af0c-75bca972627b\",\"sectionId\":\"e30188ae-cb81-4ea9-be2a-e417ac001914\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 estézargues “from the tank” côtes du rhône</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>grenache, syrah</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"id\":\"255fd061-4ce1-4d20-8719-b3832967c454\",\"position\":1,\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>nv sherman &amp; hooker \\\"shebang!\\\" ninth cuvée</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>zinfandel, grenache</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":2,\"id\":\"dde2660d-e3f1-4535-a0a5-d24acccb747d\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 montesecondo rosso toscana</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>sangiovese</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":3,\"id\":\"a4f7d575-b90d-4443-b14f-2a9d4e186e4c\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 jean-paul brun \\\"l'ancien\\\" beaujolais</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>gamay</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>12</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":4,\"id\":\"901b4fef-3caf-4ac2-bdcc-14c7c3332e2c\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2015 la clarine farm “jambalaia rouge\\\"</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>mourvedre, marsanne, grenache, syrah</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>14</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":5,\"id\":\"62ee6ba1-cb0c-48b1-9c36-c99e8ddd06ec\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>2014 tyler santa barbara county</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_TITLE\",\"text\":\"<span>pinot noir</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>16</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"104d731f-b20c-483b-afbe-5e4f876fb8f1\",\"position\":6,\"id\":\"14984fde-bbd3-454c-8810-ce98a4ccc36d\",\"sectionId\":\"fffdde6b-5e1e-4f2a-8c31-0b5cbbb7526e\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>pinthouse</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- electric jellyfish ipa</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"id\":\"ff5ce71e-71cc-47af-858e-d731709641ae\",\"position\":1,\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>rabbit hole brewing</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- off with your red ipa</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":2,\"id\":\"f9201d06-b6b7-4cc6-b42f-bc4aa53f92bd\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>live oak</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>- hefeweizen</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":3,\"id\":\"766813eb-5137-4d55-860c-31d59ddab11b\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>austin beerworks</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>blackthunder german-style schwarz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":4,\"id\":\"9c496e47-58a0-484d-83b9-98672aef7cfb\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>blue owL</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>van dayum sour red ale</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":5,\"id\":\"8c8a4004-1696-4a1e-94b2-dd0c67c9b905\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>strange land</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>austinite pilz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>6</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":6,\"id\":\"220881a6-961c-4e9f-837f-a81e103e9b6a\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>lone star</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>12 oz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>3</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":7,\"id\":\"b54bd23c-1396-4e0c-902f-021985af7c48\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>argus cidery</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>ciderkin 12oz</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>7</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":8,\"id\":\"7879b933-05e8-430f-b769-f05d6ca423ff\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"DISH_TITLE\",\"text\":\"<span>jester king</span>\",\"styles\":\""+dish_title_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\" - \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_DESCRIPTION\",\"text\":\"<span>commercial suicide mild farmhouse ale</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"DISH_PRICE\",\"text\":\"<span>10</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"e482f7db-1ec8-45fd-818e-a2beeeaaf8a3\",\"position\":9,\"id\":\"bbc98e31-c96c-49ef-a9f6-6aa2bf62f4e6\",\"sectionId\":\"353f6860-4b0e-438c-8209-f070bd8413c6\"},{\"type\":\"COMPOUND_ELEMENT\",\"inline\":true,\"styles\":{\"display\":\"block\",\"lineHeight\":0,\"marginBottom\":10.5},\"elements\":[{\"type\":\"WINE_DESCRIPTION\",\"text\":\"<span>mexican coke, diet coke, topo chico, san pellegrino lemon or orange</span>\",\"styles\":\""+dish_description_id+"\"},{\"type\":\"ELEMENT_SEPARATOR\",\"text\":\"... \",\"styles\":\""+dish_description_id+"\"},{\"type\":\"WINE_PRICE\",\"text\":\"<span>3</span>\",\"styles\":\""+dish_price_id+"\"}],\"structureId\":\"1174e969-11af-4a34-b39d-f295b58562e0\",\"id\":\"db5793bb-c1bf-4fac-b2ea-84c557173320\",\"position\":2,\"sectionId\":\"936d3d1f-bd6b-420f-9b5b-534ee02f1c07\"}]"
    })
  end
end

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

  Template.create({
    name: "Bufalina",
    canon: true,
    ext: SecureRandom.uuid,
    allows: ['component'],
    accepts: ['text'],
    printAt: ['home'],
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
              url: 'http://bufalinadue.menustyler.com/img/bufalina-logo-greyscale.png',
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
          id: SecureRandom.uuid,
          name: "TWO_COLUMNS",
          multiPage: true,
          orientation: 'landscape',
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
                  elements: []
                },
                {
                  type: 'CONTAINER',
                  align: 'bottom',
                  position: 1,
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
                            position: 'relative'
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
              position: 1,
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
                          id: SecureRandom.uuid,
                          position: 1,
                          styles: {
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
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 15,
                  paddingRight: 15,
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
                          id: SecureRandom.uuid,
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
              style: {
                marginBottom: '1.202cm'
              }
            },
            {
              id: other_section_id,
              type: "SECTION",
              position: 0,
              columnId: other_col_logo_id,
              accepts: ['img'],
              readOnly: true,
              style: {
              }
            }
          ],
          components: [
            {
              sectionId: section_id,
              type: "IMAGE_ELEMENT",
              url: 'data:image/png;base64,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',
              styles: {
                height: 61,
                width: 66
              },
              hide: true,
              position: 0,
              id: SecureRandom.uuid
            },
            {
              sectionId: other_section_id,
              type: "IMAGE_ELEMENT",
              url: 'data:image/png;base64,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',
              styles: {
                height: 119,
                width: 129
              },
              hide: true,
              position: 0,
              id: SecureRandom.uuid
            },
          ]
        }
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


