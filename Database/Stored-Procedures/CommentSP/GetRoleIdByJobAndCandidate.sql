/**************************************************************************************************
Author : Sethma Nethmini
Usage : Get role id for given candidate id ..
Changes : 
    2024-08-23 => Created
Example : 

not used
**************************************************************************************************/ 

USE SmartRecruiterDB;
GO

CREATE PROCEDURE [dbo].[GetRoleIdByCandidateId]

    @candidateId INT
AS

BEGIN

    SELECT Role_Id
    FROM candidates
    WHERE Id = @candidateId;
END