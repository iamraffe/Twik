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
    # puts m
    # m.save
    # puts m
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
            marginBottom: 5
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
              url: 'http://bufalinadue.menustyler.com/img/bufalina-logo-greyscale.png',
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
              url: 'http://bufalinadue.menustyler.com/img/bufalina-logo-greyscale.png',
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


