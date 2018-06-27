SELECT 
    members.date_created, 
    members.auth_id,
    members.id,
    -- members.name, 
    -- members.phone_home, 
    -- members.phone_cell, 
    -- members.email, 
    -- members.address, 
    -- members.city, 
    -- members.state, 
    -- members.zip, 
    -- members.abana_bool, 
    -- members.abana_num, 
    -- members.referred_by, 
    -- members.other, 
    -- payments.payment_id, 
    payments.amount, 
    payments.date, 
    payments.description
-- ADD SELECTIONS FROM PAYMENTS TABLE
FROM members
JOIN payments ON payments.member_id = members.id
WHERE auth_id = $1;