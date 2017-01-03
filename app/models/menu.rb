class Menu < ActiveRecord::Base
  has_many :sections
  has_many :archives
  has_many :images, as: :imageable
  belongs_to :template
  
  def fonts
    template.select{|object| object['type'] == 'text' }.map{|o| o["fontFamily"]}
  end

  def self.export(filename, pdf)
    save_path = Rails.root.join('public/pdf',"#{filename}.pdf")
    File.open(save_path, 'wb') do |file|
      file << pdf
    end
  end
end
