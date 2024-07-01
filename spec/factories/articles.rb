# == Schema Information
#
# Table name: articles
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_articles_on_user_id  (user_id)
#
FactoryBot.define do
  factory :article do
    content {Faker::Lorem.characters(number: 300)}
    images { [Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'jon_image.png'), 'image/png')] }
  end
end
