INSERT INTO members 
(auth_id)
VALUES 
($1)
returning *
;