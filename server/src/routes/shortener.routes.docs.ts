// {
// encode
// decode
// list
// }

/**
 * @swagger
 * tags:
 *  - Shortener:
 *      description: Encoding and decoding groups
 *  - Statistics:
 *      description: Retrieve the statistics of the URL
 *  - Retrievals:
 *      description: Retrieves all the shortened urls in the system
 *
 * /{urlPath}:
 *  get:
 *      tags: [Retrieval]
 *      description: The endpoint to redirect users to the encoded url
 *      summary: Route to redirect users to the encoded url
 *      parameters:
 *          -   in: path
 *              name: urlPath
 *              required: true
 *              schema:
 *                  type: string
 *                  example: iEx59g
 *      responses:
 *          302:
 *              description: The response when the redirection request is successfull
 *          400:
 *              description: The response when the URL is not valid
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BadRequestError'
 *          404:
 *              description: The response when the URL is not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundError'
 * /api/list:
 *  get:
 *      tags: [Retrieval]
 *      description: "The endpoint to list all the shortened URLs in the system"
 *      summary: "Returns the list of shortened urls in the system"
 *      responses:
 *          200:
 *              description: The response when the URL is successfully shortened
 *
 * /api/encode:
 *  post:
 *      tags: [Shortener]
 *      description: "The endpoint to shorten the URL"
 *      summary: "The route to shorten user URL"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          url:
 *                              type: string
 *                              example: "https://CourseProject.co"
 *      responses:
 *          201:
 *              description: The response when the URL is successfully shortened
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              results:
 *                                  $ref: '#/components/schemas/ShortResponse'
 *          400:
 *              description: The response when the URL is not valid
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BadRequestError'
 *          422:
 *              description: The response when the URL is not provided
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnprocessableEntityError'
 *
 * /api/decode:
 *  post:
 *      tags: [Shortener]
 *      description: "The endpoint to decode a shortened URL"
 *      summary: "The route to decode a shortened URL"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          url:
 *                              type: string
 *                              example: "http://localhost:4000/4a86P0"
 *      responses:
 *          200:
 *              description: The response when the URL is successfully shortened
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "URL Decoded Successfully!"
 *                              results:
 *                                  $ref: '#/components/schemas/ShortResponse'
 *          400:
 *              description: The response when the URL is not valid
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BadRequestError'
 *          404:
 *              description: The response when the URL is not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundError'
 *          422:
 *              description: The response when the URL is not provided
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnprocessableEntityError'
 * /api/statistics/{urlPath}:
 *  get:
 *      tags: [Statistics]
 *      parameters:
 *          -   in: path
 *              name: urlPath
 *              required: true
 *              schema:
 *                  type: string
 *                  example: iEx59g
 *      responses:
 *          200:
 *              description: The response when the request is successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Successful"
 *                              results:
 *                                  $ref: '#/components/schemas/FullResponse'
 *          400:
 *              description: The response when the URL is not valid
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BadRequestError'
 *          404:
 *              description: The response when the URL is not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundError'
 *
 */
