USE SmartRecruiterDB;

INSERT INTO [dbo].[comments] 
    ([Comment], [AdminId], [CandidateId], [JobId])
VALUES
    ('Great candidate with excellent skills.', 1, 1, 1),
    ('Needs improvement in communication.', 2, 2, 2),
    ('Strong technical background.', 3, 3, 3),
    ('Good fit for the team culture.', 1, 1, 2),
    ('Lacks experience in project management.', 2, 1, 1),
    ('Highly recommended for the position.', 3, 1, 2),
    ('Average performance in the interview.', 1, 2, 2),
    ('Excellent problem-solving skills.', 2, 2, 3),
    ('Not suitable for the current opening.', 3, 1, 1),
    ('Shows great potential for growth.', 1, 1, 1);