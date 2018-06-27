UPDATE members 

SET 
date_created = $2,
name = $3,
phone_home = $4,
phone_cell = $5,
email = $6,
address = $7,
city = $8,
state = $9,
zip = $10,
abana_bool = $11,
abana_num = $12,
referred_by = $13,
other = $14,
membership_age = $15

WHERE auth_id = $1;