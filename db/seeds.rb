200.times do 
  name: Faker::Cat.name
   Cat.create (
     name: name,
     breed: Faker::Cat.breed,
     registry: Faker::Cat.breed,
     avatar: Faker::Avatar.image(name, '100x400', 'png', 'set4')
   )
  
end